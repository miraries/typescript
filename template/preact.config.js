/**
 * This is mostly lifted from preact-cli-plugin-typescript,
 * but with ts-loader instead of ATL, as I couldn't get it to work.
 */
import { resolve } from "path";

export default function(config, env, helpers) {
    // Switch css-loader for typings-for-css-modules-loader, which is a wrapper
    // that automatically generates .d.ts files for loaded CSS
    helpers.getLoadersByName(config, "css-loader").map(({ loader }) => {
        loader.loader = "typings-for-css-modules-loader";
        loader.options = Object.assign(loader.options, {
            camelCase: true,
            banner:
                "// This file is automatically generated from your CSS. Any edits will be overwritten.",
            namedExport: true,
            silent: true
        });
    });

    // This is lifted from preact-cli-plugin-typescript,
    // but with ts-loader instead of ATL, as I couldn't get it to work.

    config.module.loaders.push({
        test: /\.[tj]sx?$/,
        loader: "ts-loader"
    });

    // Currently, preact-cli only looks for `src/index.js` - this will look
    // for any file in `src` named `index` that has an extension that's
    // resolved by webpack. This can be overridden by the user.
    config.resolve.alias["preact-cli-entrypoint"] = resolve(
        process.cwd(),
        "src",
        "index"
    );

    return config;
}
