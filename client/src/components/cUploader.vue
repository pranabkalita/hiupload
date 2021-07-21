<template>
  <input type="file" name="file" id="file" ref="file" multiple>
</template>

<script>
import * as Filepond from 'filepond'
import axios from 'axios'

export default {
  mounted() {
    const pond = Filepond.create(this.$refs.file, {
      allowRevert: false,
      server: {
        // 1. Define what to do for file upload
        process: (fieldName, file, metadata, load, error, progress, abort) => {
          // 0. Set all validation to false
          this.$emit('validation', {})

          // 5. Create a new FormData and CancelToken (to cancel the upload)
          let form = new FormData()
          const cancelTokenSource = axios.CancelToken.source()
    
          // 6. Request server for signed url
          axios.post('/api/files/signed', {
            // The metadata info is passed from Step 4
            name: metadata.fileInfo.name,
            extension: metadata.fileInfo.extension,
            size: metadata.fileInfo.size,
          }).then((response) => {
            // 7. Set all the additionalData received from the server to the file
            file.additionalData = response.data.additionalData

            // 8. Append all the fields from file additionalData to the form
            for (var field in file.additionalData) {
              form.append(field, file.additionalData[field])
            }

            // 9. Append the fiel to the form
            form.append('file', file)

            // 10. Upload the file to the storage url received from signed url
            axios.post(response.data.attributes.action, form, {
              // 11. Show the progress status
              onUploadProgress(e) {
                progress(e.lengthComputable, e.loaded, e.total);
              },
              // 12. Cancel the axios upload
              cancelToken: cancelTokenSource.token
            }).then(() => {
              // 13. Show the upload success
              load(`${file.additionalData.key}`)
            })
          }).catch((e) => {
            // If the uploaded size is bigger than the space available
            if (e.response.status === 422) {
              this.$emit('validation', e.response.data.errors)
            }

            abort()
          })

          // 14. Return abort method of filepond to abort the progress
          return {
            abort: () => {
              cancelTokenSource.cancel()
              abort() // from the process method parameter
            }
          }
        }
      },

      // 15. After the successfull file upload in filepond
      onprocessfile: (error, file) => {
        if (error) {
          return;
        }

        // 16. Remove the files from the filepond upload box
        pond.removeFile(file)
        
        this.$emit('onProcessFile', file)
      },

      // 2. Define what happens on adding file to filepond
      onaddfile: (error, file) => {
        // 3. If any error do nothing
        if (error) {
          return;
        }
        
        // 4. Set the metadata information to the fileInfo
        file.setMetadata('fileInfo', {
          name: file.filenameWithoutExtension,
          extension: file.fileExtension,
          size: file.fileSize
        })
      } 
    })
  }
}
</script>