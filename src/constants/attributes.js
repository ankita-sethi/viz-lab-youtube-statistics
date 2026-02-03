export const CUSTOM_COLUMNS = [
    {
        title: 'Rank',
        column_name: 'rank',
        categorical: false, 
        bin: 10
    },
    // {
    //     title: 'Youtuber',
    //     column_name: 'youtuber',
    //     categorical: true,
    //     bin: 10
    // },
    {
        title: 'Subscribers',
        column_name: 'subscribers',
        categorical: false,
        bin: 10
    },
    {
        title: 'Video Views',
        column_name: 'video views',
        categorical: false,
        bin: 10
    },
    // {
    //     title: 'Title',
    //     column_name: 'title',
    //     categorical: true,
    //     bin: 10
    // },
    {
        title: 'Uploads',
        column_name: 'uploads',
        categorical: false,
        bin: 10
    },
    {
        title: 'Country',
        column_name: 'country',
        categorical: true,
        bin: 10,
        ano_col: 'country_index'
    },
    {
        title: 'Channel Type',
        column_name: 'channel_type',
        categorical: true,
        bin: 10,
        ano_col: 'channel_index'
    },
    {
        title: 'Country Rank',
        column_name: 'country_rank',
        categorical: false,
        bin: 10
    },
    {
        title: 'Channel type rank',
        column_name: 'channel_type_rank',
        categorical: false,
        bin: 10
    },
    {
        title: 'Video Views in last 30 days',
        column_name: 'video_views_for_the_last_30_days',
        categorical: false,
        bin: 10
    },
    {
        title: 'Lowest yearly earnings',
        column_name: 'lowest_yearly_earnings',
        categorical: false,
        bin: 10
    },
    {
        title: 'Highest yearly earnings',
        column_name: 'highest_yearly_earnings',
        categorical: false,
        bin: 10
    },
    {
        title: 'Subscribers in last 30 days',
        column_name: 'subscribers_for_last_30_days',
        categorical: false,
        bin: 10
    },
    {
        title: 'Created Year',
        column_name: 'created_year',
        categorical: false,
        bin: 10
    },
    {
        title: 'Created Month',
        column_name: 'created_month',
        categorical: true,
        bin: 10,
        ano_col: 'month_index'
    },
]