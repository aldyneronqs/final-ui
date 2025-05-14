import { TextField, Button, Box, Typography } from '@mui/material';
import { useForm, type SubmitHandler } from 'react-hook-form';
import type { Post } from '../types/Post';

interface PostFormProps {
    onSubmit: SubmitHandler<Post>;
    initialValues?: Post;
    isEditing?: boolean;
}

const PostForm = ({ onSubmit, initialValues, isEditing = false }: PostFormProps) => {
    const { register, handleSubmit, formState: { errors } } = useForm<Post>({
        defaultValues: initialValues
    });

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Typography variant="h5" gutterBottom>
                {isEditing ? 'Edit Post' : 'Create Post'}
            </Typography>

            <TextField
                fullWidth
                margin="normal"
                label="Content"
                multiline
                rows={4}
                {...register('content', { required: 'Content is required' })}
                error={!!errors.content}
                helperText={errors.content?.message}
            />

            <TextField
                fullWidth
                margin="normal"
                label="Media URL (Image or YouTube link)"
                {...register('imageUrl')}
                error={!!errors.imageUrl}
                helperText={errors.imageUrl?.message}
            />

            <TextField
                fullWidth
                margin="normal"
                label="Author"
                {...register('author', { required: 'Author is required' })}
                error={!!errors.author}
                helperText={errors.author?.message}
            />

            <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                {isEditing ? 'Update Post' : 'Add New Post'}
            </Button>
        </Box>
        
    );
};

export default PostForm;
