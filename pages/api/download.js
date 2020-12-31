import axios from "axios"

export default async (req, res) => {

  const { Link } = req.query
    let newUrl = Link.replace(/\?.*/, "").trim()
    newUrl =
      newUrl.substr(newUrl.length - 1) === "/" ? newUrl.slice(0, -1).trim() : ""

    const fetchData = await axios.get(`${newUrl}/?__a=1&_=1609405325701`)
    res.setHeader("Content-Type", "application/json")
    const rawData = await fetchData.data

    if (rawData.graphql.shortcode_media.is_video) {
      const videoResult = await rawData.graphql.shortcode_media.video_url
      const videoThumbnail = await rawData.graphql.shortcode_media.display_url

      return res.status(200).json({
        resData: videoResult,
        thumbnailData: videoThumbnail
      })
    } else {
      const Imageresult = await rawData.graphql.shortcode_media.display_url
      const imageThumbnail = await rawData.graphql.shortcode_media.display_url
      return res.status(200).json({
        resData: Imageresult,
        thumbnailData: imageThumbnail
      })
    }

}
