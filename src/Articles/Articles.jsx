import { useEffect, useState } from 'react';
import './Articles.css';
import { fetchBitcoinNews } from '../Backend/articlesApi';
import { Avatar, Box, Button, Container, List, Pagination, PaginationItem, TextField, Typography } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

function NewsCard({ article }) {
    return (
        <Box mb={2}>
            <Box display='flex' alignItems='center'>
                <Avatar src={article.urlToImage} />
                <Typography variant='h6' component='h3' ml={2}>
                    {article.author}
                </Typography>
                <Typography variant='body2' color='textSecondary' ml='auto'>
                    {new Intl.DateTimeFormat('en-GB', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit'
                    }).format(new Date(Date.parse(article.publishedAt)))}
                </Typography>
            </Box>
            <Box mt={1}>
                <Typography variant='h5' component='h2' gutterBottom>
                    {article.title}
                </Typography>
                <Typography variant='body1' color='textSecondary'>
                    {article.description}
                </Typography>
            </Box>
            <Box display='flex' justifyContent='flex-end'>
                <Button variant='contained' color='primary' href={article.url} endIcon={<OpenInNewIcon />}>
                    Read More
                </Button>
            </Box>
        </Box>
    );
}

function Articles() {
    const [searchQuery, setSearchQuery] = useState('');
    const [articles, setArticles] = useState([]);
    const [page, setPage] = useState(1);
    const articlesPerPage = 6;

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchBitcoinNews();
            setArticles(data);
        };
        fetchData();
    }, []);

    const filteredArticles = articles.filter((article) =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const paginatedArticles = filteredArticles.slice((page - 1) * articlesPerPage, page * articlesPerPage);

    return (
        <Container maxWidth='lg'>
            <Box my={4}>
                <Typography variant='h4' component='h1' gutterBottom>
                    Trending Articles
                </Typography>
                <TextField
                    label='Search'
                    variant='outlined'
                    fullWidth
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Box display='flex' justifyContent='space-between' alignItems='center' mt={2}>
                    <Typography variant='h6' component='h2'>
                        Showing {paginatedArticles.length} articles per page
                    </Typography>
                    <Pagination count={Math.ceil(filteredArticles.length / articlesPerPage)} page={page} onChange={(event, value) => setPage(value)}>
                        {Array.from({ length: Math.ceil(filteredArticles.length / articlesPerPage) }, (_, index) => (
                            <PaginationItem key={index} page={index} onClick={() => setPage(index)}>
                                {index + 1}
                            </PaginationItem>
                        ))}
                    </Pagination>
                </Box>
                <List>
                    {paginatedArticles.map((article) => (
                        <NewsCard key={article.id} article={article} />
                    ))}
                </List>
            </Box>
        </Container>
    )
}
export default Articles;