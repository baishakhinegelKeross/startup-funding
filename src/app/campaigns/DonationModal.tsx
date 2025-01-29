"use client";
import React, { useState } from "react";
import axios from "axios";
import { X } from "lucide-react";

interface DonationModalProps {
    campaignId: string;
    onClose: () => void;
    onDonate: (amount: number, donorName: string, message: string) => void;
}

const DonationModal: React.FC<DonationModalProps> = ({ campaignId, onClose, onDonate }) => {
    const [amount, setAmount] = useState("");
    const [donorName, setDonorName] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Convert amount to number and pass it to the onDonate callback
        const donationAmount = Number(amount);
        onDonate(donationAmount, donorName, message);

        const axiosData = {
            amount: donationAmount,
            fullName: donorName,
            message: message,
        };

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/fundraiser/campaign/checkout`,
                axiosData,
                { headers: { "Content-Type": "application/json" } }
            );
            console.log("Form submitted successfully", response);

            if (response.status === 200 && response.data.url) { window.open(response.data.url, "_blank"); }
        } catch (error) {
            console.error("Form submission error", error);
        }

        // Close the modal after donation submission
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral/60 backdrop-blur-sm">
            {/* Modal container with height limiting and scrolling */}
            <div className="card w-full max-w-2xl  shadow-2xl animate-in fade-in zoom-in p-4 relative max-h-[80vh] overflow-y-auto">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="btn btn-ghost absolute right-2 top-2 text-xl text-neutral-400 hover:text-neutral-700"
                >
                    <X className="w-6 h-6" />
                </button>

                <h2 className="mt-6 text-3xl font-bold text-center">Make a Donation</h2>

                <form onSubmit={handleSubmit} className="card-body space-y-4 pb-6">
                    {/* Donation Amount */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Amount ($)</span>
                        </label>
                        <input
                            type="number"
                            min="1"
                            required
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="input input-bordered w-full focus:outline-none text-[#fff]"
                            placeholder="Enter amount"
                        />
                    </div>

                    {/* Donor Name */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Your Name</span>
                        </label>
                        <input
                            type="text"
                            required
                            value={donorName}
                            onChange={(e) => setDonorName(e.target.value)}
                            className="input input-bordered w-full focus:outline-none text-[#fff]"
                            placeholder="Enter your name"
                        />
                    </div>

                    {/* Message */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Message (Optional)</span>
                        </label>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="textarea textarea-bordered w-full focus:outline-none text-[#fff]"
                            placeholder="Leave a message of support"
                            rows={3}
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="btn btn-primary w-full mt-4 uppercase tracking-wide font-semibold"
                    >
                        Complete Donation
                    </button>
                </form>
            </div>
        </div>
    );
};

export default DonationModal;
