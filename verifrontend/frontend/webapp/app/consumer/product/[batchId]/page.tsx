"use client";
import Nav from "@/components/Nav";

interface Props { params: { batchId: string } }

export default function ConsumerProduct({ params }: Props) {
  return (
    <div>
      <Nav />
      <main className="p-8">
        <h1 className="text-2xl font-bold">Public Product View: {params.batchId}</h1>
        <p className="mt-2">Selective disclosure public view. Backend will provide only public fields as per policy.</p>
      </main>
    </div>
  );
}
