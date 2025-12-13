
const FEEDS = [
    // --- NEWS ---
    {
        id: 'news-techmeme',
        url: 'https://api.rss2json.com/v1/api.json?rss_url=https://www.techmeme.com/feed.xml'
    },
    {
        id: 'news-google',
        url: 'https://api.rss2json.com/v1/api.json?rss_url=https://news.google.com/rss/search?q=Artificial+Intelligence+when:7d&hl=en-US&gl=US&ceid=US:en'
    },
    {
        id: 'news-hn',
        url: 'https://api.rss2json.com/v1/api.json?rss_url=https://hnrss.org/newest?q=AI'
    },
    {
        id: 'news-openai',
        url: 'https://api.rss2json.com/v1/api.json?rss_url=https://openai.com/news/rss.xml'
    },
    {
        id: 'news-mit',
        url: 'https://api.rss2json.com/v1/api.json?rss_url=https://www.technologyreview.com/topic/artificial-intelligence/feed/'
    },
    {
        id: 'news-verge',
        url: 'https://api.rss2json.com/v1/api.json?rss_url=https://www.theverge.com/rss/ai-artificial-intelligence/index.xml'
    },
    {
        id: 'news-deepmind',
        url: 'https://api.rss2json.com/v1/api.json?rss_url=https://blog.research.google/atom.xml'
    },
    {
        id: 'news-google-blog',
        url: 'https://api.rss2json.com/v1/api.json?rss_url=https://blog.google/rss'
    },
    // --- RESEARCH ---
    {
        id: 'research-arxiv',
        url: 'https://api.rss2json.com/v1/api.json?rss_url=http://export.arxiv.org/rss/cs.AI'
    },
    // --- JOBS ---
    {
        id: 'jobs-wework',
        url: 'https://api.rss2json.com/v1/api.json?rss_url=https://weworkremotely.com/categories/remote-machine-learning-jobs.rss'
    },
    {
        id: 'jobs-remoteok',
        url: 'https://api.rss2json.com/v1/api.json?rss_url=https://remoteok.com/rss'
    },
    // --- VIDEOS (YouTube) ---
    {
        id: 'video-wesroth',
        url: 'https://api.rss2json.com/v1/api.json?rss_url=https://www.youtube.com/feeds/videos.xml?channel_id=UCg_p-Fp_b5Dq_09w6a4YwGA'
    },
    {
        id: 'video-matthewberman',
        url: 'https://api.rss2json.com/v1/api.json?rss_url=https://www.youtube.com/feeds/videos.xml?channel_id=UCMi8qg-eB1d7kS_c7F3g_Cg'
    },
    {
        id: 'video-coldfusion',
        url: 'https://api.rss2json.com/v1/api.json?rss_url=https://www.youtube.com/feeds/videos.xml?channel_id=UC4QZ_LsYcvcq7qOsOhpAX4A'
    },
    {
        id: 'video-aigrid',
        url: 'https://api.rss2json.com/v1/api.json?rss_url=https://www.youtube.com/feeds/videos.xml?channel_id=UCXy2m-1m4jC-2uFvA5s3bBA'
    },
    {
        id: 'video-microsoft',
        url: 'https://api.rss2json.com/v1/api.json?rss_url=https://www.youtube.com/feeds/videos.xml?channel_id=UCGCz0fBqj2N_Jg7o-T-b99Q'
    },
    {
        id: 'video-twominutepapers',
        url: 'https://api.rss2json.com/v1/api.json?rss_url=https://www.youtube.com/feeds/videos.xml?channel_id=UCbfYPyITQ-7l4upoX8nvctg'
    },
    {
        id: 'video-mattwolfe',
        url: 'https://api.rss2json.com/v1/api.json?rss_url=https://www.youtube.com/feeds/videos.xml?channel_id=UCnAtMWn98fQ07kYy6_9v-w'
    },
    {
        id: 'video-aiexplained',
        url: 'https://api.rss2json.com/v1/api.json?rss_url=https://www.youtube.com/feeds/videos.xml?channel_id=UCNJ1Ymd5yFuUPtn21xtRbbw'
    },
    {
        id: 'video-deepmind',
        url: 'https://api.rss2json.com/v1/api.json?rss_url=https://www.youtube.com/feeds/videos.xml?channel_id=UCP7jMXSY2xbc3KCAE0MHQ-A'
    },
    {
        id: 'video-bycloud',
        url: 'https://api.rss2json.com/v1/api.json?rss_url=https://www.youtube.com/feeds/videos.xml?channel_id=UC3X8J1_5Y7M47_7Q573573'
    },
    {
        id: 'video-nvidia',
        url: 'https://api.rss2json.com/v1/api.json?rss_url=https://www.youtube.com/feeds/videos.xml?channel_id=UCOoKqA10yd_1FZ4B5F4qLg'
    },
    {
        id: 'video-ibm',
        url: 'https://api.rss2json.com/v1/api.json?rss_url=https://www.youtube.com/feeds/videos.xml?channel_id=UC7c8mE90Kk42C2X4C7k1Pgg'
    }
];

async function checkFeeds() {
    console.log('Checking feeds...');
    let errors = 0;

    for (const feed of FEEDS) {
        try {
            const start = performance.now();
            const res = await fetch(feed.url);
            const data = await res.json();
            const end = performance.now();

            if (data.status === 'ok') {
                console.log(`✅ [${feed.id}] OK (${Math.round(end - start)}ms)`);
            } else {
                console.error(`❌ [${feed.id}] FAILED: ${data.message}`);
                errors++;
            }
        } catch (err) {
            console.error(`❌ [${feed.id}] NETWORK ERROR: ${err.message}`);
            errors++;
        }
    }

    console.log(`\ncheck complete. ${errors} errors found.`);
}

checkFeeds();
