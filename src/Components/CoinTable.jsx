import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { fetchAllCoins } from '../Backend/api';
import { Box, Button, Card, IconButton, Popover, TableFooter, Typography, useTheme, } from '@mui/material';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CloseIcon from '@mui/icons-material/Close';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './cointable.css'

function TablePaginationActions(props) {
    const theme = useTheme();

    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}
TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

function CoinTable() {
    const [coins, setCoins] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [selectedCoin, setSelectedCoin] = useState([]);
    const [popoverOpen, setPopoverOpen] = useState(false);
    const [popoverAnchorEl, setPopoverAnchorEl] = useState(null);

    const handleCoinClick = (coin) => {
        setSelectedCoin(coin);
        setPopoverAnchorEl(document.getElementById(`coin-${coin.id}`))
        setPopoverOpen(true);
    };

    const handlePopoverClose = () => {
        setPopoverOpen(false);
    };


    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - coins.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchAllCoins();
            setCoins(data);
        };
        fetchData();
    }, []);
    return (
        <>
            <TableContainer component={Paper} className='Table-Container'>
                <Table sx={{
                    minWidth: 350,
                    maxWidth: 1000,
                    fontFamily: 'Poppins'
                }}>
                    <TableHead className="Table-Header" sx={{
                        fontFamily: 'Poppins',
                        fontStyle: 'normal',
                        fontSize: '900',
                        fontWeight: 'bold',


                    }}>
                        <TableRow>
                            <TableCell>Symbol</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>24H %</TableCell>
                            <TableCell>Circulating Supply</TableCell>
                            <TableCell>Details</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {coins.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6}>No coins found.</TableCell>
                            </TableRow>
                        ) : (
                            coins.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((coin) => (
                                <TableRow key={coin.id}>
                                    <TableCell>{coin.symbol}</TableCell>
                                    <TableCell>{coin.name}</TableCell>
                                    <TableCell>R{coin.current_price}</TableCell>
                                    <TableCell className={`${coin.price_change_percentage_24h < 0 ? 'text-red-400' : 'text-green-400'}`}>
                                        {coin.price_change_percentage_24h < 0 ?
                                            <>
                                                <TrendingDownIcon />
                                                {coin.price_change_percentage_24h}
                                            </>
                                            :
                                            <>
                                                <TrendingUpIcon />
                                                {coin.price_change_percentage_24h}
                                            </>
                                        }
                                    </TableCell>
                                    <TableCell>{coin.circulating_supply}</TableCell>
                                    <TableCell>
                                        <Button onClick={() => handleCoinClick(coin)} ><MoreHorizIcon /></Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[6]}
                                colSpan={3}
                                count={coins.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                slotProps={{
                                    select: {
                                        inputProps: {
                                            'aria-label': 'rows per page',
                                        },
                                        native: true,
                                    },
                                }}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
            <Popover
                open={popoverOpen}
                anchorEl={popoverAnchorEl}
                onClose={handlePopoverClose}
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'center'
                }}
                transformOrigin={{
                    vertical: 'center',
                    horizontal: 'center'
                }}
            >
                <Card sx={{ p: 2, position: 'relative', width: 'auto' }}>
                    <Box display='flex' alignItems='center' justifyContent='flex-end' mb={2}>
                        <IconButton onClick={handlePopoverClose}>
                            <CloseIcon />
                        </IconButton>

                    </Box>
                    <Box display="flex" alignItems="center" mb={2}>
                        <img src={selectedCoin.image} alt={selectedCoin.name} width="50" height="50"></img>
                        <Typography variant='h3' ml={2}>{selectedCoin.name}</Typography>

                    </Box>
                    <Container className='Info-Container'>
                        <Row className='Info-row'>
                            <Col className='Info-label'>Symbol:</Col>
                            <Col className='Info-value'>{selectedCoin.symbol}</Col>
                        </Row>
                        <Row className='Info-row'>
                            <Col className='Info-label'>Market Rank:</Col>
                            <Col className='Info-value'>{selectedCoin.market_cap_rank}</Col>
                        </Row>
                        <Row className='Info-row'>
                            <Col className='Info-label'>Price:</Col>
                            <Col className='Info-value'>R {selectedCoin.current_price}</Col>
                        </Row>
                        <Row className='Info-row'>
                            <Col className='Info-label'>Highest Value in 24H:</Col>
                            <Col className='Info-value'>R {selectedCoin.high_24H}</Col>
                        </Row>
                        <Row className='Info-row'>
                            <Col className='Info-label'>Lowest Value in 24H:</Col>
                            <Col className='Info-value'>R {selectedCoin.low_24H}</Col>
                        </Row>
                        <Row className='Info-row'>
                            <Col className='Info-label'>Price Change In 24H:</Col>
                            <Col className='Info-value'>R {selectedCoin.price_change_24h}</Col>
                        </Row>
                        <Row className='Info-row'>
                            <Col className='Info-label'>Lowest Change in 24H %:</Col>
                            <Col className='Info-value'>{selectedCoin.price_change_percentage_24h}</Col>
                        </Row>
                    </Container>
                </Card>
            </Popover>

        </>);
}
export default CoinTable;