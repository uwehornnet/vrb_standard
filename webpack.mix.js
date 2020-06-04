let mix = require('laravel-mix');
// require("laravel-mix-react-typescript-extension");

mix.webpackConfig({
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: Config.babel()
                    }
                ]
            }
        ]
    }
});

mix.sass('src/styles/backend/styles.sass', 'assets/css/vrbadmin.css')
    .sass('src/styles/frontend/styles.sass', 'assets/css/vrb.css')
    .react('src/scripts/backend/index.js', 'assets/js/vrbadmin.js')
    .react('src/scripts/frontend/index.js', 'assets/js/vrb.js');
