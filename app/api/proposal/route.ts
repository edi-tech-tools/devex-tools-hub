import { NextResponse } from 'next/server';

export async function GET() {
  const fs = await import('fs/promises');
  const path = await import('path');
  
  try {
    const filePath = path.join(process.cwd(), 'public', 'hermes-proposal.md');
    const content = await fs.readFile(filePath, 'utf-8');
    
    return new NextResponse(content, {
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        'Content-Disposition': 'attachment; filename="Hermes_AI项目方案书_v1.0.md"',
      },
    });
  } catch {
    return new NextResponse('File not found', { status: 404 });
  }
}
