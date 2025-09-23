import React from "react";
import { FaTwitter, FaRedditAlien, FaTelegramPlane, FaDiscord, FaGlobe } from "react-icons/fa";
import "./Community.css";

export default function Community({ detailedData }) {
  if (!detailedData) {
    return <div className="community-loading">Loading community data...</div>;
  }

  const community_data = detailedData.community_data || {};
  const links = detailedData.links || {};

  const homepage = links.homepage?.[0] || null;
  const twitter = links.twitter_screen_name ? `https://twitter.com/${links.twitter_screen_name}` : null;
  const reddit = links.subreddit_url || links.reddit_url || null;
  const telegram = links.telegram_channel_identifier
    ? `https://t.me/${links.telegram_channel_identifier}`
    : (links.telegram_url || null);
  const discord = links.discord_url || null;

  const formatNumber = (n) =>
    typeof n === "number" && !isNaN(n) ? n.toLocaleString() : "Unknown";

  const hasAnyLink = homepage || twitter || reddit || telegram || discord;

  return (
    <div className="community-container" role="region" aria-label="Community and Social Links">
      <h2 className="community-title">Community & Socials</h2>

      <div className="community-links">
        {homepage && (
          <a href={homepage} target="_blank" rel="noopener noreferrer">
            <FaGlobe /> Official Website
          </a>
        )}
        {twitter && (
          <a href={twitter} target="_blank" rel="noopener noreferrer">
            <FaTwitter /> Twitter
          </a>
        )}
        {reddit && (
          <a href={reddit} target="_blank" rel="noopener noreferrer">
            <FaRedditAlien /> Reddit
          </a>
        )}
        {telegram && (
          <a href={telegram} target="_blank" rel="noopener noreferrer">
            <FaTelegramPlane /> Telegram
          </a>
        )}
        {discord && (
          <a href={discord} target="_blank" rel="noopener noreferrer">
            <FaDiscord /> Discord
          </a>
        )}
        {!hasAnyLink && <div className="no-links">No public links available</div>}
      </div>

      <div className="community-stats">
        <div className="stat">
          <div className="stat-label"><FaTwitter /> Twitter followers</div>
          <div className="stat-value">{formatNumber(community_data.twitter_followers)}</div>
        </div>

        <div className="stat">
          <div className="stat-label"><FaRedditAlien /> Reddit subscribers</div>
          <div className="stat-value">
            {typeof community_data.reddit_subscribers === "number" && community_data.reddit_subscribers > 0
              ? community_data.reddit_subscribers.toLocaleString()
              : "Unknown"}
          </div>
        </div>

        <div className="stat">
          <div className="stat-label"><FaRedditAlien /> Reddit active (24h)</div>
          <div className="stat-value">
            {typeof community_data.reddit_active_users === "number" && community_data.reddit_active_users > 0
              ? community_data.reddit_active_users.toLocaleString()
              : "Unknown"}
          </div>
        </div>
      </div>
    </div>
  );
}
