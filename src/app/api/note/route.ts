import prisma from "@/lib/db";
import PrismaErrorHandler from "@/lib/PrismaErrorHandler";
import { validatePayload } from "@/lib/validation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const query = req.nextUrl.searchParams.get("query") || "";

    const resNotes = await prisma.note.findMany({
      where: {
        title: {
          contains: query,
          mode: "insensitive",
        },
      },

      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(
      {
        status: "success",
        data: resNotes,
        message: "Data retrieved successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    return PrismaErrorHandler.handleDefault(error);
  }
}

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    const { success, data, errors } = validatePayload(payload);

    if (!success || !data) {
      return NextResponse.json(
        {
          status: "error",
          message: "Invalid Request",
          errors,
        },
        { status: 400 },
      );
    }

    const response = await prisma.note.create({
      data: data,
    });

    return NextResponse.json(
      {
        status: "success",
        data: response,
        message: "Data create successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    return PrismaErrorHandler.handleDefault(error);
  }
}
