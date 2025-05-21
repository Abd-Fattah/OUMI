"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { X } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { closeModal } from "@/lib/redux/slices/uiSlice"

interface ModalProps {
  id: string
  title: string
  children: React.ReactNode
  size?: "sm" | "md" | "lg" | "xl"
}

export function Modal({ id, title, children, size = "md" }: ModalProps) {
  const dispatch = useAppDispatch()
  const modalRef = useRef<HTMLDivElement>(null)
  const modal = useAppSelector((state) => state.ui.modals.find((m) => m.id === id))

  const isOpen = modal?.isOpen || false

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        dispatch(closeModal(id))
      }
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node) && isOpen) {
        dispatch(closeModal(id))
      }
    }

    document.addEventListener("keydown", handleEscape)
    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [dispatch, id, isOpen])

  if (!isOpen) return null

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div ref={modalRef} className={`bg-white rounded-lg shadow-xl w-full ${sizeClasses[size]} overflow-hidden`}>
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button onClick={() => dispatch(closeModal(id))} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  )
}
