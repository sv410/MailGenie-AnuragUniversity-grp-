import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const os = (searchParams.get("os") || "").toLowerCase()

    if (os !== "mac" && os !== "win") {
      return NextResponse.json({ message: "Invalid os. Use ?os=mac or ?os=win" }, { status: 400 })
    }

    // In production, stream the real file from object storage or the filesystem
    const filename = os === "mac" ? "MailGenie-Setup.dmg" : "MailGenie-Setup.exe"
    const fileContent = `This is a placeholder for ${filename}. Replace this with the real binary.`

    return new NextResponse(fileContent, {
      status: 200,
      headers: {
        "Content-Type": os === "mac" ? "application/x-apple-diskimage" : "application/vnd.microsoft.portable-executable",
        "Content-Disposition": `attachment; filename=${filename}`,
        "Cache-Control": "no-store",
      },
    })
  } catch (error) {
    console.error("Download extension error", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
