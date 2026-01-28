<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="html" encoding="utf-8" indent="yes"/>
    <xsl:template match="/">
        <html lang="fr" xmlns="http://www.w3.org/1999/xhtml">
            <head>
                <title><xsl:value-of select="/rss/channel/title"/> - RSS</title>
                <meta charset="utf-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <script src="https://cdn.tailwindcss.com"></script>
            </head>
            <body class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4 md:px-8">
                <div class="max-w-3xl mx-auto">
                    <header class="text-center mb-12">
                        <h1 class="text-5xl md:text-6xl font-bold text-gray-900 mb-4 drop-shadow-sm">
                            <xsl:value-of select="/rss/channel/title"/>
                        </h1>
                        <p class="text-xl text-gray-600 font-medium">
                            <xsl:value-of select="/rss/channel/description"/>
                        </p>
                    </header>
                    
                    <div class="space-y-6">
                        <xsl:for-each select="/rss/channel/item">
                            <article class="group bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 overflow-hidden">
                                <div class="p-8">
                                    <header>
                                        <h2 class="text-2xl md:text-3xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                                            <a>
                                                <xsl:attribute name="href">
                                                    <xsl:value-of select="link"/>
                                                </xsl:attribute>
                                                <xsl:attribute name="rel">bookmark</xsl:attribute>
                                                <xsl:value-of select="title"/>
                                            </a>
                                        </h2>
                                        <p class="text-gray-600 leading-relaxed mb-6 line-clamp-3">
                                            <xsl:value-of select="description"/>
                                        </p>
                                    </header>
                                    <footer class="flex flex-col justify-end sm:flex-row gap-4 items-start sm:items-center text-sm text-gray-500 pt-4 border-t border-gray-100">
                                        <time class="font-semibold">
                                            <xsl:attribute name="datetime">
                                                <xsl:value-of select="pubDate"/>
                                            </xsl:attribute>
                                            Publié le <xsl:value-of select="pubDate"/>
                                        </time>
                                        <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                                            #<xsl:number value="position()"/> sur <xsl:number value="last()"/>
                                        </span>
                                    </footer>
                                </div>
                            </article>
                        </xsl:for-each>
                    </div>
                    
                    <footer class="mt-16 text-center text-gray-500 text-sm pt-12 border-t border-gray-200">
                        <p>
                            Flux généré par <strong>Astro</strong> • 
                            <a>
                                <xsl:attribute name="href">
                                    <xsl:value-of select="/rss/channel/link"/>
                                </xsl:attribute>
                                <xsl:attribute name="class">hover:text-blue-600</xsl:attribute>
                                <xsl:attribute name="rel">home</xsl:attribute>
                                Site complet
                            </a>
                        </p>
                    </footer>
                </div>
                <!-- Petit script pour formater les dates à la française si possible -->
                <script>
                    <![CDATA[
                    document.querySelectorAll('time').forEach(el => {
                        try {
                            const dateStr = el.getAttribute('datetime');
                            if (dateStr) {
                                const date = new Date(dateStr);
                                if (!isNaN(date)) {
                                    el.textContent = 'Publié le ' + date.toLocaleDateString('fr-FR', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    });
                                }
                            }
                        } catch (e) {
                            console.error('Erreur de formatage de date:', e);
                        }
                    });
                    ]]>
                </script>
            </body>
        </html>

    </xsl:template>
</xsl:stylesheet>
