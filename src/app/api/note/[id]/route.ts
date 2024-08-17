import prisma from "@/lib/db";
import PrismaErrorHandler from "@/lib/PrismaErrorHandler";
import { validatePayload } from "@/lib/validation";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const resNote = await prisma.note.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!resNote) {
      return NextResponse.json(
        {
          status: "error",
          message: "Invalid ID",
          errors: {
            code: 400,
            description: "ID is required and must be valid.",
          },
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        status: "success",
        data: resNote,
        message: "Data retrieved successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    return PrismaErrorHandler.handleDefault(error);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    if (!params.id) {
      return NextResponse.json(
        {
          status: "error",
          message: "Invalid ID",
          errors: {
            code: 400,
            description: "ID is required and must be valid.",
          },
        },
        { status: 400 },
      );
    }

    const resNote = await prisma.note.delete({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json(
      {
        status: "success",
        data: resNote,
        message: "Data deleted successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return PrismaErrorHandler.handlePrisma(error);
    }

    return PrismaErrorHandler.handleDefault(error);
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    if (!params.id) {
      return NextResponse.json(
        {
          status: "error",
          message: "Invalid ID",
          errors: {
            code: 400,
            description: "ID is required and must be valid.",
          },
        },
        { status: 400 },
      );
    }

    const payload = await req.json();
    const { success, data, errors } = validatePayload({
      ...payload,
      id: params.id || "",
    });
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

    const response = await prisma.note.update({
      where: {
        id: data.id,
      },
      data: {
        body: data.body,
        title: data.title,
      },
    });

    return NextResponse.json(
      {
        status: "success",
        data: response,
        message: "Data update successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return PrismaErrorHandler.handlePrisma(error);
    }

    return PrismaErrorHandler.handleDefault(error);
  }
}
