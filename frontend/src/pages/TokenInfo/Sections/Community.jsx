import React from "react";
import "./Community.css";

export default function Community({ detailedData }) {
    if (!detailedData || !detailedData.community_data) {
        return <div>Loading community data...</div>;
    }

    const { community_data, links } = detailedData;

    return (
        <div className="community-container">
            <h2 className="community-title">Community & Socials</h2>
            <div className="community-links">
                <a href={links.homepage[0]} target="_blank" rel="noopener noreferrer">🌐 Official Website</a>
                {links.twitter_screen_name && (
                    <a href={`https://twitter.com/${links.twitter_screen_name}`} target="_blank" rel="noopener noreferrer">🐦 Twitter</a>
                )}
                {links.reddit_url && (
                    <a href={links.reddit_url} target="_blank" rel="noopener noreferrer">📢 Reddit</a>
                )}
                {links.telegram_channel_identifier && (
                    <a href={`https://t.me/${links.telegram_channel_identifier}`} target="_blank" rel="noopener noreferrer">📩 Telegram</a>
                )}
                {links.discord_url && (
                    <a href={links.discord_url} target="_blank" rel="noopener noreferrer">🎮 Discord</a>
                )}
            </div>

            <div className="community-stats">
                <p>🐦 Twitter Followers: <span>{community_data.twitter_followers.toLocaleString()}</span></p>
                <p>📢 Reddit Subscribers: <span>{community_data.reddit_subscribers > 0 ? community_data.reddit_subscribers.toLocaleString() : "Unknown"}</span></p>
                <p>🗨️ Reddit Active Users (24h): <span>{community_data?.reddit_active_users ? community_data?.reddit_active_users.toLocaleString() : "Unknown"}</span></p>
            </div>
        </div>
    );
}
