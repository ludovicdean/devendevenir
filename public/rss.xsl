<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template match="/">
<html lang="fr">
<head>
    <title>RSS - DevEnDevenir</title>
    <meta charset="utf-8"/>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: system-ui, sans-serif; 
            max-width: 800px; margin: 0 auto; padding: 2rem; 
            line-height: 1.6; color: #333; background: #fafafa;
        }
        header { text-align: center; margin-bottom: 3rem; }
        h1 { font-size: 2.5rem; color: #1a1a1a; margin-bottom: 0.5rem; font-weight: 700; }
        .subtitle { color: #666; font-size: 1.1rem; }
        .feed { background: white; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); overflow: hidden; }
        .item { padding: 2rem; border-bottom: 1px solid #eee; }
        .item:last-child { border-bottom: none; }
        .item:hover { background: #f8f9fa; }
        .title { font-size: 1.4rem; font-weight: 600; margin-bottom: 0.5rem; }
        .title a { color: #1a73e8; text-decoration: none; }
        .title a:hover { text-decoration: underline; }
        .description { color: #555; margin-bottom: 1rem; }
        .meta { display: flex; gap: 1.5rem; font-size: 0.9rem; color: #888; }
        .date { font-weight: 500; }
        .count { background: #e8f4fd; color: #1a73e8; padding: 0.2rem 0.5rem; border-radius: 9999px; font-size: 0.8rem; }
        @media (max-width: 768px) { 
            body { padding: 1rem; } 
            h1 { font-size: 2rem; }
            .meta { flex-direction: column; gap: 0.5rem; text-align: center; }
        }
    </style>
</head>
<body>
    <header>
        <h1>DevEnDevenir</h1>
        <p class="subtitle">Le blog des devs reconvertis</p>
    </header>
    <div class="feed">
        <xsl:for-each select="rss/channel/item">
            <div class="item">
                <h2 class="title">
                    <a>
                        <xsl:attribute name="href">
                            <xsl:value-of select="link"/>
                        </xsl:attribute>
                        <xsl:value-of select="title"/>
                    </a>
                </h2>
                <p class="description">
                    <xsl:value-of select="description"/>
                </p>
                <div class="meta">
                    <span class="date">
                        <xsl:value-of select="pubDate"/>
                    </span>
                    <span class="count">
                        <xsl:number value="position()"/> / <xsl:number value="last()"/>
                    </span>
                </div>
            </div>
        </xsl:for-each>
    </div>
</body>
</html>
</xsl:template>
</xsl:stylesheet>
