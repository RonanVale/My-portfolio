import { withSentryConfig } from '@sentry/nextjs';
/** @type {import('next').NextConfig} */
const nextConfig = {};

// Only enable Sentry webpack plugin when an auth token is provided.
// This prevents the build-time warning: 'No Sentry auth token configured.'
const sentryPluginOptions = {
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options

    // Suppresses source map uploading logs during build
    silent: true,
    org: "javascript-mastery",
    project: "javascript-nextjs",
};

// Export the Next config wrapped with Sentry only if an auth token exists.
// This avoids noisy messages during local development/builds when token is absent.
const finalConfig = process.env.SENTRY_AUTH_TOKEN
    ? withSentryConfig(nextConfig, sentryPluginOptions, {
        // For all available options, see:
        // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

        // Upload a larger set of source maps for prettier stack traces (increases build time)
        widenClientFileUpload: true,

        // Transpiles SDK to be compatible with IE11 (increases bundle size)
        transpileClientSDK: true,

        // Hides source maps from generated client bundles
        hideSourceMaps: true,

        // Automatically tree-shake Sentry logger statements to reduce bundle size
        disableLogger: true,

        // Enables automatic instrumentation of Vercel Cron Monitors.
        automaticVercelMonitors: true,
    })
    : nextConfig;

export default finalConfig;