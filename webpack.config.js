/* eslint-disable no-undef */
const path = require('path');
const autoprefixer = require('autoprefixer');
// const devMode = process.env.NODE_ENV !== 'production';

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry: './src/index.jsx',
    output: {
        filename: 'js/main.js',
        path: path.resolve(__dirname, 'public/'),
        publicPath: '',
    },
    resolve: {
        extensions: ['.js', '.jsx', '.scss'],
        modules: ['node_modules'],
        alias: {
            components: path.resolve(__dirname, './src/components/'),
            ac: path.resolve(__dirname, './src/ac/'),
            containers: path.resolve(__dirname, './src/containers/'),
            img: path.resolve(__dirname, './src/img/'),
            reducers: path.resolve(__dirname, './src/reducers/'),
            store: path.resolve(__dirname, './src/store/'),
            utils: path.resolve(__dirname, './src/utils/'),
        },
    },
    devtool: 'source-map',
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                parallel: true,
            }),
            new OptimizeCSSAssetsPlugin({}),
        ],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.(sa|sc|c)ss|css$/,
                exclude: [],
                oneOf: [
                    {
                        resourceQuery: /^\?raw$/,
                        use: [
                            MiniCssExtractPlugin.loader,

                            'css-loader',
                            {
                                loader: 'postcss-loader',
                                options: {
                                    plugins: [
                                        require('autoprefixer')({
                                            cascade: false,
                                        }),
                                    ],
                                },
                            },
                            'sass-loader',
                        ],
                    },
                    {
                        use: [
                            MiniCssExtractPlugin.loader,
                            {
                                loader: 'css-loader',
                                options: {
                                    importLoaders: 1,
                                    modules: true,
                                    localIdentName: '[local]_[hash:base64:15]',
                                },
                            },
                            {
                                loader: 'postcss-loader',
                                options: {
                                    plugins: [
                                        autoprefixer({
                                            cascade: false,
                                        }),
                                    ],
                                },
                            },
                            'sass-loader',
                        ],
                    },
                ],
            },
            {
                test: /\.(eot|ttf|woff|woff2|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'fonts/[name].[ext]',
                            context: '',
                        },
                    },
                ],
                include: [
                    path.resolve(__dirname, 'src/fonts'),
                ],
            },
            {
                test: /config\.js/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'webfonts-loader',
                        options: {
                            name: '/fonts/[name].[ext]',
                        },
                    },
                ],
                include: [path.resolve(__dirname, 'src/components/Icon')],
            },
            {
                // DATA IMAGES
                test: /\.(png|jpe?g|svg)$/,
                oneOf: [
                    {
                        resourceQuery: /^\?raw$/,
                        use: [
                            {
                                loader: 'url-loader',
                                options: {
                                    limit: 8192,
                                    name: 'icons/[name].[ext]?raw',
                                },
                            },
                        ],
                        include: [
                            path.resolve(__dirname, 'src/icons'),
                        ],
                    },
                    {
                        use: [
                            {
                                loader: 'file-loader',
                                options: {
                                    name: 'icons/[name].[ext]?[hash]',
                                },
                            },
                        ],
                        include: [
                            path.resolve(__dirname, 'src/icons'),
                        ],
                    },
                ],
            },
            {
                // IMAGES
                test: /\.(png|jpe?g|svg|svgz)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'images/[name].[ext]?[hash]',
                        },
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 85,
                            },
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: '80-90',
                                speed: 4,
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            // the webp option will enable WEBP
                            // webp: {
                            //     quality: 75
                            // }
                        },
                    },
                ],
                include: [
                    path.resolve(__dirname, 'src/img'),
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: '[id].css',
        }),
        new HtmlWebpackPlugin({
            title: 'Components',
            meta: {
                viewport: 'width=device-width, initial-scale=1',
            },
            hash: true,
            template: 'src/indexTemplate.html',
        }),
    ],
};
