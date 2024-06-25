import React from 'react';
import classes from './Pagination.module.scss'

interface PaginationProps {
    totalPosts: number,
    postsPerPage: number,
    currentPage: number,
    setCurrentPage: ((page: number) => void)

}

const Pagination: React.FC<PaginationProps> = ({totalPosts, postsPerPage, currentPage, setCurrentPage}) => {

    let pages = []

    for (let i=0;i <= Math.ceil(totalPosts / postsPerPage);i++){
        pages.push(i)
    }

    return (
        <div className={classes.pagination}>
            {pages.map((page, index) => {
                return (
                    <button
                        key={index}
                        onClick={() => setCurrentPage(page)}
                        className={page == currentPage ? "active" : ""}>
                        {page}
                    </button>
                );
            })}
        </div>
    );
};

export default Pagination;
