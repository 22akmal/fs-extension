import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query'
import blogService from '../services/blogs'
import { useSetNotif } from './store'

export const useBlogs = () => {
  const queryClient = useQueryClient()
  const setNotif = useSetNotif()

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    refetchOnWindowFocus: false
  })

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      setNotif(`a new blog ${newBlog.title} by ${newBlog.user.name} added`)
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.concat(newBlog))
    }
  })

  const updateBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      const unSortedBlog = blogs.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog)
      queryClient.setQueryData(['blogs'], blogService.sortBlog(unSortedBlog))
    },
    onError: (error) => {
      console.error('Failed to update a blog: ', error)
    }
  })

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.deleteBlog,
    onSuccess: (deletedBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      const unSortedBlog = blogs.filter(blog => blog.id !== deletedBlog.id)
      queryClient.setQueryData(['blogs'], blogService.sortBlog(unSortedBlog))
    },
    onError: (error) => {
      console.error('Failed to delete a blog: ', error)
    }
  })

  const commentBlogMutation = useMutation({
    mutationFn: ({comment, blogId}) => blogService.addComment(comment, blogId),
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      const newBlogs = blogs.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog)
      queryClient.setQueryData(['blogs'], newBlogs)
    }
  })

  return {
    blogs: result.data,
    isPending: result.isPending,
    addBlog: (newBlog) => newBlogMutation.mutate(newBlog),
    updateBlogLike: (updatedBlog) => updateBlogMutation.mutate(updatedBlog),
    deleteBlog: (deletedBlogId) => deleteBlogMutation.mutate(deletedBlogId),
    addComment: (comment, blogId) => commentBlogMutation.mutate({comment, blogId})
  }
}