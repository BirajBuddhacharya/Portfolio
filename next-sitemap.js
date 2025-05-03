/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://yourwebsite.com', // Replace with your site’s URL
  generateRobotsTxt: true, // Automatically generates a robots.txt file
  exclude: ['/admin/*'], // Optional: Exclude specific routes
};