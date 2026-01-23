"use client";

type Props = {
  ingredientId: string;
  isDeleted?: boolean;
  onSoftDelete: (id: string) => void;
  onPermanentDelete: (id: string) => void;
};

export default function IngredientActionsCell({
  ingredientId,
  isDeleted,
  onSoftDelete,
  onPermanentDelete,
}: Props) {
  return (
    <div className="flex gap-5 mt-2 justify-center items-center opacity-0 group-hover:opacity-100">
      {!isDeleted && (
        <button
          onClick={() => onSoftDelete(ingredientId)}
          className="text-yellow-600 cursor-pointer"
          title="Soft delete"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#1371c3"
          >
            <path d="M200-440v-80h560v80H200Z" />
          </svg>
        </button>
      )}

      <button
        onClick={() => onPermanentDelete(ingredientId)}
        className="text-red-600 cursor-pointer"
        title="Delete permanently"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#ff0000"
        >
          <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
        </svg>
      </button>
    </div>
  );
}
