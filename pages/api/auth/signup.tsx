import { NextApiRequest, NextApiResponse } from "next";
import validator from "validator";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import * as jose from "jose";
import { setCookie } from "cookies-next";
import { prisma } from '@/lib/prisma';
// const prisma = new PrismaClient();



function validateUserData(firstName: string, lastName: string, email: string, phone: string, city: string, password: string): string[] {
  const errors: string[] = [];

  const validationSchema = [
    {
      valid: validator.isLength(firstName, {
        min: 1,
        max: 20,
      }),
      errorMessage: "FirstName:First name is invalid",
    },
    {
      valid: validator.isLength(lastName, {
        min: 1,
        max: 20,
      }),
      errorMessage: "LastName:Last name is invalid",
    },
    {
      valid: validator.isEmail(email),
      errorMessage: "Email:Email is invalid",
    },
    {
      valid: validator.isMobilePhone(phone),
      errorMessage: "Phone:Phone number is invalid",
    },
    {
      valid: validator.isLength(city, { min: 1 }),
      errorMessage: "City:City is invalid",
    },
    {
      valid: validator.isStrongPassword(password, { minSymbols: 0 }),
      errorMessage: "Password:Password not strong enough. Must have at least 8 characters, 1 uppercase letter, 1 lowercase letter, and 1 number..",
    },
  ];

  validationSchema.forEach((check) => {
    if (!check.valid) {
      errors.push(check.errorMessage);
    }
  });

  return errors;
}




export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const { firstName, lastName, email, phone, city, password } = req.body;
      // errors contains error messages from validation

      //check if the email is associated with an existing account
      const userWithEmail = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (userWithEmail) {
        console.log('400 error 2')

        return res
          .status(400)
          .json({ errorMessage: "Email:Email is associated with another account" });
      }


      const errors = validateUserData(firstName, lastName, email, phone, city, password)
      if (errors.length > 0) {
        console.log('400 error 1')
        return res.status(400).json({ errorMessage: errors[0] });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          first_name: firstName,
          last_name: lastName,
          password: hashedPassword,
          city,
          phone,
          email,
        },
      });

      const alg = "HS256";

      const secret = new TextEncoder().encode(process.env.JWT_SECRET);

      const token = await new jose.SignJWT({ email: user.email })
        .setProtectedHeader({ alg })
        .setExpirationTime("24h")
        .sign(secret);

      setCookie("jwt", token, { req, res, maxAge: 60 * 6 * 24 });

      return res.status(200).json({
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        phone: user.phone,
        city: user.city,
      });
    }

    return res.status(404).json("Unknown endpoint");
  } catch (error) {
    console.log('server error last step')
    console.error(error);
    return res.status(500).json("Internal server error");
  }

}
