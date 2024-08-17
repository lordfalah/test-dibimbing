import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextResponse } from "next/server";

class PrismaErrorHandler {
  static handlePrisma(error: PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2025": // Record not found
        return NextResponse.json(
          {
            status: "error",
            message: "Record not found",
            errors: {
              code: 404,
              description: "The record with the provided ID was not found.",
            },
          },
          { status: 404 },
        );

      default:
        return this.handleDefault(error);
    }
  }

  static handleDefault(error: unknown) {
    // Default error response for non-Prisma errors
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

export default PrismaErrorHandler;
