"use client";

import { useState } from "react";
import { saveFormula } from "@/utils/storage";
import { Formula } from "@/types/formula";
import Modal from "./CustomModal";

type Props = {
  open: boolean;
  onClose: () => void;
  onCreated: () => void;
};

export default function CreateFormulaModal({
  open,
  onClose,
  onCreated,
}: Props) {
  const [name, setName] = useState("");
  const [type, setType] = useState("Fine Fragrance");
  const [project, setProject] = useState("");
  const [description, setDescription] = useState("");

  const handleCreate = () => {
    const newFormula: Formula = {
      id: crypto.randomUUID(),
      name,
      code: `FR-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000)}`,
      type,
      project,
      description,
      ingredients: [],
    };
    saveFormula(newFormula);
    onCreated();
    onClose();
    setName("");
    setType("Fine Fragrance");
    setProject("");
    setDescription("");
  };

  return (
    <Modal open={open} onClose={onClose} title="Create New Formula">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Formula Name</label>
          <input
            className="w-full border rounded px-3 py-2 mt-1"
            placeholder="e.g. Velvet Rose Accord"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm font-medium">Formula Code</label>
          <input
            className="w-full border rounded px-3 py-2 mt-1 bg-gray-100"
            value="Auto Generated"
            disabled
          />
        </div>

        <div>
          <label className="text-sm font-medium">Formula Type</label>
          <select
            className="w-full border rounded px-3 py-2 mt-1"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option>Fine Fragrance</option>
            <option>Home Care</option>
            <option>Personal Care</option>
          </select>
        </div>

        {/* Project */}
        <div>
          <label className="text-sm font-medium">
            Project / Workspace (Optional)
          </label>
          <input
            className="w-full border rounded px-3 py-2 mt-1"
            value={project}
            onChange={(e) => setProject(e.target.value)}
          />
        </div>

        {/* Description */}
        <div className="col-span-2">
          <label className="text-sm font-medium">Description</label>
          <textarea
            className="w-full border rounded px-3 py-2 mt-1"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <button onClick={onClose} className="px-4 py-2 border rounded">
          Cancel
        </button>
        <button
          onClick={handleCreate}
          disabled={!name}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        >
          Create Formula
        </button>
      </div>
    </Modal>
  );
}
