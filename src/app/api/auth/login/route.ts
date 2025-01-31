import { NextRequest, NextResponse } from "next/server";
import { serialize } from "cookie";
import jwt from "jsonwebtoken";
import { runQuery } from "../../../../utils/dbConnector";
import bcrypt from "bcrypt";
import { RowDataPacket } from "mysql2";

interface User extends RowDataPacket {
  id: number;
  username: string;
  password: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password } = body;

    if (!process.env.JWT_SECRET) {
      return NextResponse.json(
        { message: "JWT Secret is not set" },
        { status: 500 }
      );
    }

    const query = "SELECT * FROM users WHERE username = ?";
    const values = [username]; 
    const result = await runQuery<User>(query, values);

    if (Array.isArray(result) && result.length > 0) {
      const user = result[0]; 
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        const token = jwt.sign(
          { id: user.id, username: user.username },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );

        const response = NextResponse.json(
          { message: "Login successful" },
          { status: 200 }
        );
        response.headers.set(
          "Set-Cookie",
          serialize("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
          })
        );

        return response;
      } else {
        return NextResponse.json(
          { message: "Invalid credentials" },
          { status: 401 }
        );
      }
    } else {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Error during authentication:", error);
    NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
