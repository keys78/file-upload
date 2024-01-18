export const extractPublicIdFromImageUrl = (imageUrl: string) => {
    const segments = imageUrl.split('/');
    const publicId = segments.slice(-2).join('/');
    return publicId.substring(0, publicId.lastIndexOf('.'));
};