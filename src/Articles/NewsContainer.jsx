import React from 'react'
import NewsCard from './NewsCard';

function NewsContainer({ articles }) {
    return (<div className='container'>
        {articles.map((article, index) => (
            <NewsCard key={index} article={article} />
        ))}
    </div>

    )
}

export default NewsContainer