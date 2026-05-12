"use client";
import { useState } from "react";

export default function ProductImage({ src, alt, restricted = false }) {
  const [broken, setBroken] = useState(false);

  if (restricted) {
    return (
      <div className="pc-img-placeholder">
        <span>Enhanced Verification Required</span>
      </div>
    );
  }

  if (!src || broken) {
    return (
      <div className="pc-img-placeholder">
        <span>No image available</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="pc-img"
      onError={() => setBroken(true)}
    />
  );
}
