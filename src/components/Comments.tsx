import Giscus from '@giscus/react';

export default function Comments() {
    return (
        <div className="mt-16 pt-8 border-t border-border">
            <h3 className="text-2xl font-bold mb-8 text-primary glow-text">Discussion</h3>
            <Giscus
                id="comments"
                repo="contact-ajmal/whats-going-on-ai"
                repoId="R_kgDONc1CgA" // I'll need to double check this using GitHub API or fallback to user input
                category="Announcements"
                categoryId="DIC_kwDONc1CgM4ClR2_"
                mapping="pathname"
                strict="0"
                reactionsEnabled="1"
                emitMetadata="0"
                inputPosition="top"
                theme="transparent_dark"
                lang="en"
                loading="lazy"
            />
        </div>
    );
}
