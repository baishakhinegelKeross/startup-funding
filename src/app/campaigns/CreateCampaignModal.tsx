"use client";

import React, { useState } from "react";
import { X, Calendar } from "lucide-react";
import { Campaign } from "@/types";

interface CreateCampaignModalProps {
  onClose: () => void;
  onCreateCampaign: (
    campaign: Omit<Campaign, "_id" | "amount_raised" | "createdAt">
  ) => void;
}

export function CreateCampaignModal({
  onClose,
  onCreateCampaign,
}: CreateCampaignModalProps) {
  const [title, setTitle] = useState("");
  const [story, setStory] = useState("");
  const [goalAmount, setGoalAmount] = useState("");
  const [endDate, setEndDate] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [owner, setOwner] = useState("");
  const [category, setCategory] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateCampaign({
      title,
      story,
      goal_amount: Number(goalAmount),
      end_date: new Date(endDate),
      image_url: imageUrl,
      owner,
      category,
      email,
    });
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

        <h2 className="mt-6 text-3xl font-bold text-center">Start a Campaign</h2>

        <form onSubmit={handleSubmit} className="card-body space-y-4 pb-6">
          {/* Campaign Title */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Campaign Title</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input input-bordered w-full focus:outline-none"
              placeholder="Enter campaign title"
            />
          </div>

          {/* Description */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Description</span>
            </label>
            <textarea
              required
              rows={4}
              value={story}
              onChange={(e) => setStory(e.target.value)}
              className="textarea textarea-bordered w-full focus:outline-none"
              placeholder="Describe your campaign"
            />
          </div>

          {/* Funding Goal & End Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Funding Goal */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Funding Goal ($)</span>
              </label>
              <input
                type="number"
                required
                min="1"
                value={goalAmount}
                onChange={(e) => setGoalAmount(e.target.value)}
                className="input input-bordered w-full focus:outline-none"
                placeholder="Enter funding goal"
              />
            </div>

            {/* End Date */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">End Date</span>
              </label>
              <div className="relative">
                <Calendar className="absolute top-3 left-3 w-5 h-5 text-neutral-400" />
                <input
                  type="date"
                  required
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  className="input input-bordered pl-9 w-full focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Image URL */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Campaign Image URL</span>
            </label>
            <input
              type="url"
              required
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="input input-bordered w-full focus:outline-none"
              placeholder="Enter image URL (e.g., from Unsplash)"
            />
          </div>

          {/* Creator Name / Org */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">
                Creator Name / Organization
              </span>
            </label>
            <input
              type="text"
              required
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
              className="input input-bordered w-full focus:outline-none"
              placeholder="Enter your name or organization"
            />
          </div>

          {/* Category */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Category</span>
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="input input-bordered w-full focus:outline-none"
              placeholder="e.g. Technology, Charity, Creative, etc."
            />
          </div>

          {/* Email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Email</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered w-full focus:outline-none"
              placeholder="Enter your email address"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn btn-primary w-full mt-4 uppercase tracking-wide font-semibold"
          >
            Create Campaign
          </button>
        </form>
      </div>
    </div>
  );
}
