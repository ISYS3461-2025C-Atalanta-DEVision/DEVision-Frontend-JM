import jobPostService from "../../../services/jobPostService";

function getPostPaginated(pageNumber, pageSize = DEFAULT_PAGE_SIZE) {
    const maxPage = Math.ceil(jobPostService.getJobPostsByCompany.length / pageSize);
    return {
        data: jobPostService.getJobPostsByCompany.slice(
            pageNumber * pageSize,
            (pageNumber + 1) * pageSize
        ),
        maxPage: maxPage
    }
}
export default getPostPaginated;