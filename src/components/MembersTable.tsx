import React from "react";
import { Member } from "@/data/members";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaBluesky, FaXTwitter } from "react-icons/fa6";

interface MembersTableProps {
  members: Member[];
  searchQuery?: string;
  membersWithoutEmbed?: Set<string>;
}

export default function MembersTable({
  members,
  searchQuery,
  membersWithoutEmbed = new Set(),
}: MembersTableProps) {
  const highlightText = (text: string | null | undefined) => {
    if (!text || !searchQuery) return text || "";

    const parts = text.split(new RegExp(`(${searchQuery})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === searchQuery.toLowerCase() ? (
        <mark
          key={i}
          style={{ background: "#d8e5f0", color: "#002e5d", padding: "0 2px" }}
        >
          {part}
        </mark>
      ) : (
        part
      ),
    );
  };

  return (
    <div className="members-table-container">
      <div className="search-results-info">
        {searchQuery ? (
          members.length === 0 ? (
            `No results found for "${searchQuery}"`
          ) : (
            `Found ${members.length} member${members.length !== 1 ? "s" : ""}`
          )
        ) : (
          <span className="search-results-placeholder">&nbsp;</span>
        )}
      </div>
      <table className="members-table">
        <thead>
          <tr>
            <th>name</th>
            <th>program</th>
            <th>site</th>
            <th>links</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member, index) => {
            const hasNoEmbed = membersWithoutEmbed.has(member.id);
            return (
              <tr
                key={member.id}
                style={hasNoEmbed ? { opacity: 1 } : undefined}
              >
                <td className="user-cell">
                  {member.profilePic ? (
                    <img
                      src={member.profilePic}
                      alt={member.name || "Member"}
                      className={`avatar avatar-highlighted`}
                    />
                  ) : (
                    <div
                      className={`avatar-highlighted avatar`}
                      style={{ backgroundColor: "#d8e5f0" }}
                    />
                  )}
                  {member.website && member.website.trim() ? (
                    <a
                      href={
                        member.website.startsWith("http")
                          ? member.website
                          : `https://${member.website}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="name-link"
                    >
                      {highlightText(member.name) || "No name"}
                    </a>
                  ) : (
                    <span>{highlightText(member.name) || "No name"}</span>
                  )}
                </td>
                <td>{highlightText(member.program) || "—"}</td>
                <td>
                  {member.website && member.website.trim() ? (
                    <a
                      href={
                        member.website.startsWith("http")
                          ? member.website
                          : `https://${member.website}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="site-link"
                    >
                      {member.website
                        .replace(/^https?:\/\//, "")
                        .replace(/^www\./, "")
                        .replace(/\/$/, "")}
                    </a>
                  ) : (
                    <span className="table-placeholder">—</span>
                  )}
                </td>
                <td>
                  <div className="social-icons">
                    {member.instagram && (
                      <a
                        href={member.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-icon-link"
                        title="Instagram"
                      >
                        <FaInstagram size={16} />
                      </a>
                    )}
                    {member.twitter && (
                      <a
                        href={member.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-icon-link"
                        title="Twitter/X"
                      >
                        <FaXTwitter size={16} />
                      </a>
                    )}
                    {member.bluesky && (
                      <a
                        href={member.bluesky}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-icon-link"
                        title="Bluesky"
                      >
                        <FaBluesky size={16} />
                      </a>
                    )}
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-icon-link"
                        title="LinkedIn"
                      >
                        <FaLinkedin size={16} />
                      </a>
                    )}
                    {!member.instagram &&
                      !member.twitter &&
                      !member.bluesky &&
                      !member.linkedin && (
                        <span className="table-placeholder">—</span>
                      )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
