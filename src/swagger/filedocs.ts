/**
 * @swagger
 * /v1/file/:
 *   post:
 *     tags:
 *       - Files
 *     summary: Upload a file
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: File upload successful
 *       400:
 *         description: Bad request, file size exceeds the limit or invalid file type
 *       500:
 *         description: Internal Server Error
 * 
 *   get:
 *     tags:
 *       - Files
 *     summary: Get all files
 *     responses:
 *       200:
 *         description: Get all files
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       image:
 *                         type: string
 *       500:
 *         description: Internal Server Error
 *
 * /v1/file/{id}:
 *   get:
 *     tags:
 *       - Files
 *     summary: Get a single file by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Get a single file by ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 image:
 *                   type: string
 *       404:
 *         description: File not found
 *       500:
 *         description: Internal Server Error
 * 
 *   delete:
 *     tags:
 *       - Files
 *     summary: Delete a file by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: File deleted successfully
 *       404:
 *         description: File not found
 *       500:
 *         description: Internal Server Error
 */
