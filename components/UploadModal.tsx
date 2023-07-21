"use client";

import useUploadModal from "@/hooks/useUploadModal";
import Modal from "./Modal";
import Input from "./Input"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import Button from "./Button";
import { useUser } from "@/hooks/useUser";
import toast from "react-hot-toast";
import uniqid from "uniqid";

const UploadModal = () => {
    const [isLoading, setIsLoading] = useState(false);
    const uploadModal = useUploadModal();
    const { user } = useUser();
    const {
        register, handleSubmit, reset
    } = useForm<FieldValues>({
        defaultValues: {
            author: '',
            title: '',
            song: null,
            image: null
        }
    })

    const onChange = (open: boolean) => {
        if (!open) {
            reset();
            uploadModal.onClose();
        }
    }

    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        try {
            setIsLoading(true);

            const songFile = values.image?.[0];
            const imageFile = values.song?.[0];

            if (!songFile) {
                toast.error('Missing song file');
                return;
            }
            if (!imageFile) {
                toast.error('Missing image file');
                return;
            }
            if (!user) {
                toast.error('User not logged in');
                return;
            }

            const uniqueID = uniqid

        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    }

  return (
    <Modal title="Add a song" description="Upload an mp3 file" isOpen={uploadModal.isOpen} onChange={onChange}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">

            <Input id="title" disabled={isLoading} {...register('title', {required: true})} placeholder="Song Title" />

            <Input id="author" disabled={isLoading} {...register('author', {required: true})} placeholder="Song Author" />

            <div>
                <div className="pb-1">
                    Select a song file
                </div>
                <Input id="song" type="file" accept=".mp3" disabled={isLoading} {...register('song', {required: true})} />
            </div>

            <div>
                <div className="pb-1">
                    Select an image file
                </div>
                <Input id="image" type="file" accept="image/*" disabled={isLoading} {...register('song', {required: true})} />
            </div>

            <Button disabled={isLoading} type="submit" className="w-full bg-emerald-500 mt-2">
                Create
            </Button>

        </form>
    </Modal>
  );
};

export default UploadModal;
