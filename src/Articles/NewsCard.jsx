import React from 'react'
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

function NewsCard({ article }) {
    return (
        <div className='card'>
            <div className='card-header'>
                <img src={article.urlToImage}
                    alt={article.urlToImage.toString}
                />
            </div>
            <div className='card-body'>
                <h4> {article.title}</h4>
                <p> {article.description}</p>
            </div>
            <div className='author'>
                <div className='author-info'>
                    <h5>{article.author}</h5>
                    <small> {
                        new Intl.DateTimeFormat('en-GB', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit'
                        }).format(new Date(Date.parse(article.publishedAt)))
                    }</small>
                </div>
            </div>
            <button className='more-btn'
                type='submit'
                href={article.url}>Read More<OpenInNewIcon />
            </button>
        </div>
    )
}

export default NewsCard