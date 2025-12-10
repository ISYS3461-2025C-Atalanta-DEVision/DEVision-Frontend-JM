import jobPostStore from "../../store/jobpost.create.store";

function useCreatePostForm(createPostApi, validateAll) {
    const { postData, loading, error, setPostData, setLoading, setError } = jobPostStore();


}

export default useCreatePostForm;