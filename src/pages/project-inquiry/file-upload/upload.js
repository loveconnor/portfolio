"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Upload, X, File, ImageIcon, FileText, FilePlus } from "lucide-react"
import styles from "./FileUpload.module.css"

export const FileUpload = ({ onFilesChange }) => {
    const [files, setFiles] = useState([])
    const [isDragging, setIsDragging] = useState(false)
    const fileInputRef = useRef(null)

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files)
        addFiles(selectedFiles)
    }

    const addFiles = (selectedFiles) => {
        const newFiles = selectedFiles.map((file) => ({
            id: `${file.name}-${Date.now()}`,
            file,
            preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : null,
        }))

        const updatedFiles = [...files, ...newFiles]
        setFiles(updatedFiles)

        if (onFilesChange) {
            onFilesChange(updatedFiles.map((f) => f.file))
        }
    }

    const removeFile = (id) => {
        const updatedFiles = files.filter((file) => file.id !== id)
        setFiles(updatedFiles)

        if (onFilesChange) {
            onFilesChange(updatedFiles.map((f) => f.file))
        }
    }

    const handleDragOver = (e) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = () => {
        setIsDragging(false)
    }

    const handleDrop = (e) => {
        e.preventDefault()
        setIsDragging(false)

        if (e.dataTransfer.files.length > 0) {
            addFiles(Array.from(e.dataTransfer.files))
        }
    }

    const handleBrowseClick = () => {
        fileInputRef.current?.click()
    }

    const getFileIcon = (file) => {
        const type = file.file.type

        if (type.startsWith("image/")) {
            return <ImageIcon size={24} />
        } else if (type === "application/pdf") {
            return <FileText size={24} />
        } else {
            return <File size={24} />
        }
    }

    return (
        <div className={styles.fileUploadContainer}>
            <div
                className={`${styles.dropzone} ${isDragging ? styles.dragging : ""}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={handleBrowseClick}
            >
                <input type="file" ref={fileInputRef} onChange={handleFileChange} multiple className={styles.fileInput} />
                <div className={styles.dropzoneContent}>
                    <div className={styles.uploadIcon}>
                        <Upload size={32} />
                    </div>
                    <p className={styles.dropzoneText}>
                        <span className={styles.highlight}>Click to browse</span> or drag and drop files here
                    </p>
                    <p className={styles.dropzoneHint}>
                        Upload logos, documents, images or any other relevant files (max 10MB each)
                    </p>
                </div>
            </div>

            {files.length > 0 && (
                <div className={styles.fileList}>
                    <AnimatePresence>
                        {files.map((file) => (
                            <motion.div
                                key={file.id}
                                className={styles.fileItem}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className={styles.filePreview}>
                                    {file.preview ? (
                                        <img
                                            src={file.preview || "/placeholder.svg"}
                                            alt={file.file.name}
                                            className={styles.previewImage}
                                        />
                                    ) : (
                                        getFileIcon(file)
                                    )}
                                </div>
                                <div className={styles.fileInfo}>
                                    <p className={styles.fileName}>{file.file.name}</p>
                                    <p className={styles.fileSize}>{formatFileSize(file.file.size)}</p>
                                </div>
                                <button
                                    type="button"
                                    className={styles.removeButton}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        removeFile(file.id)
                                    }}
                                    aria-label="Remove file"
                                >
                                    <X size={16} />
                                </button>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}

            {files.length > 0 && (
                <button type="button" className={styles.addMoreButton} onClick={handleBrowseClick}>
                    <FilePlus size={16} />
                    Add more files
                </button>
            )}
        </div>
    )
}

function formatFileSize(bytes) {
    if (bytes === 0) return "0 Bytes"

    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}
