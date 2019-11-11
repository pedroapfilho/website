module.exports = {
  siteMetadata: {
    title: "Pedro Filho",
    description: "Curious by nature, entrepreneur and JavaScript enthusiast.",
    name: "Pedro",
    subtitles: ["I'm a Software Engineer at Game Analytics", "🇧🇷 🇵🇹 🇳🇱 🇬🇧"],
    siteUrl: "https://pedroapfilho.com",
    thoughts: "https://twitter.com/pedrofilhome",
    code: "https://github.com/pedroapfilho",
    blog: "https://dev.to/pedroapfilho"
  },
  plugins: [
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Pedro Filho",
        short_name: "Pedro Filho",
        start_url: "/",
        background_color: "#ffffff",
        theme_color: "#1a1a1a",
        display: "standalone",
        icon: "src/assets/favicon.png"
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `${__dirname}/src/images/`
      }
    },
    "gatsby-theme-awesomeness"
  ]
};
