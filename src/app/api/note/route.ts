import prisma from "@/lib/db";
import { SchemaNote } from "@/schemas/note";
import { Note } from "@prisma/client";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

export type TResSuccess<TData> = {
  status: string;
  data: TData;
  message: string;
};

export async function GET(req: NextRequest) {
  try {
    const idNote = req.nextUrl.searchParams.get("id");
    if (idNote) {
      const resNote = await prisma.note.findFirst({
        where: {
          id: idNote,
        },
      });

      return NextResponse.json(
        {
          status: "success",
          data: resNote,
          message: "Data retrieved successfully",
        },
        { status: 200 },
      );
    } else {
      const resNotes = await prisma.note.findMany({
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
    }
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "An unexpected error occurred. Please try again later.",
        errors: {
          code: 500,
          description: "Internal server error.",
        },
      },
      { status: 500 },
    );
  }
}
export async function POST(req: Request) {
  try {
    const payload = await req.json();
    const validatePayloads = SchemaNote.safeParse(payload);
    if (!validatePayloads.success) {
      let errors = {};

      validatePayloads.error.issues.forEach((issue) => {
        errors = { ...errors, [issue.path[0]]: issue.message };

        return errors;
      });
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
      data: validatePayloads.data,
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
    return NextResponse.json({
      status: "error",
      message: "An unexpected error occurred. Please try again later.",
      error: {
        code: 500,
        description: "Internal server error.",
      },
    });
  }
}

export async function PUT(req: Request) {
  try {
    const payload = await req.json();
    const validatePayloads = SchemaNote.safeParse(payload);
    if (!validatePayloads.success) {
      let errors = {};

      validatePayloads.error.issues.forEach((issue) => {
        errors = { ...errors, [issue.path[0]]: issue.message };

        return errors;
      });
      return NextResponse.json(
        {
          status: "error",
          message: "Invalid Request",
          errors,
        },
        { status: 400 },
      );
    }

    if (!validatePayloads.data.id) {
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

    const response = await prisma.note.update({
      where: {
        id: validatePayloads.data.id,
      },
      data: {
        body: validatePayloads.data.body,
        title: validatePayloads.data.title,
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
    return NextResponse.json({
      status: "error",
      message: "An unexpected error occurred. Please try again later.",
      error: {
        code: 500,
        description: "Internal server error.",
      },
    });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const idNote = req.nextUrl.searchParams.get("id");
    if (idNote) {
      const resNote = await prisma.note.delete({
        where: {
          id: idNote,
        },
      });

      return NextResponse.json(
        {
          status: "success",
          data: resNote,
          message: "Data delete successfully",
        },
        { status: 200 },
      );
    } else {
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
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "An unexpected error occurred. Please try again later.",
        errors: {
          code: 500,
          description: "Internal server error.",
        },
      },
      { status: 500 },
    );
  }
}
