import React from "react";

/**
 * Convert post to embed
 * @param {object} post
 */
export default function convertPostToEmbed(post) {
  if (post.secure_media) {
    if (post.secure_media.reddit_video) {
      const REDDIT_VIDEO = post.secure_media.reddit_video;
      return (
        <video
          className="post-image"
          title={post.title}
          src={REDDIT_VIDEO.fallback_url}
          width={REDDIT_VIDEO.width}
          height={REDDIT_VIDEO.height}
          controls
        ></video>
      );
    }
    if (post.secure_media.oembed) {
      const OEMBED = post.secure_media.oembed;

      const start = OEMBED.html.indexOf("src=") + 5;
      const calculateActualEnd =
        OEMBED.html.length - OEMBED.html.substring(start).length;
      const end =
        OEMBED.html.substring(start).indexOf('" ') + calculateActualEnd;
      const url = OEMBED.html.substring(start, end);

      if (
        ["redgifs.com", "gfycat.com", "tenor.com", "youtube.com"].includes(
          post.secure_media.type
        )
      ) {
        return (
          <iframe
            src={url}
            title={post.title}
            className="post-image"
            width={OEMBED.width}
            height={OEMBED.height}
            allowFullScreen={true}
          ></iframe>
        );
      }
      return (
        <video
          className="post-image"
          title={post.title}
          src={url}
          width={OEMBED.width}
          height={OEMBED.height}
          controls
        ></video>
      );
    }
  }
}
