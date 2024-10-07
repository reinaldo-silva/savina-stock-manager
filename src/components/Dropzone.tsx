import clsx from "clsx";
import { X } from "lucide-react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";

interface DropzoneProps {
  maxFiles?: number;
  images: File[];
  setImages: (files: File[]) => void;
}
export function Dropzone({ maxFiles = 5, images, setImages }: DropzoneProps) {
  const onDrop = (acceptedFiles: File[]) => {
    const newFiles = [...images, ...acceptedFiles].slice(0, maxFiles);
    setImages(newFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles,
  });

  function removeImage(index: number) {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  }

  return (
    <div className="dropzone-container">
      <div
        {...getRootProps()}
        className={`dropzone border-2 border-dashed p-4 text-center ${
          isDragActive ? "bg-gray-200" : "bg-white"
        }`}
      >
        <input {...getInputProps()} />
        <p className={clsx({ "text-red-500": images.length >= maxFiles })}>
          {images.length < maxFiles
            ? "Arraste ou clique para adicionar imagens"
            : "Você atingiu o limite de 5 imagens"}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-4">
        {images.map((image, index) => (
          <div key={index} className="relative h-32 w-32">
            <Image
              width={200}
              height={200}
              src={URL.createObjectURL(image)}
              alt={`Imagem ${index + 1}`}
              className="h-full w-full rounded object-cover"
            />
            <button
              className="absolute right-1 top-1 rounded-full bg-red-500 p-1 text-white"
              onClick={() => removeImage(index)}
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
