import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserVideo, uploadVideo } from "../features/videoSlice";
import VideoCard from "./VideoCard";
import { FaPlus } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { IconContext } from "react-icons/lib";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const YourVideos = ({ userId }) => {
  const [videos, setVideos] = useState([]);
  const [details, setDetails] = useState(() => ({
    title: "",
    description: "",
    video: null,
    videoUrl: "",
    thumbnail: null,
    thumbnailUrl: "",
  }));
  const [uploadProgress, setUploadProgress] = useState(0);

  const dispatch = useDispatch();
  const videoInputRef = useRef(null);
  const thumbnailInputRef = useRef(null);

  const { loading } = useSelector((state) => state.video);

  useEffect(() => {
    dispatch(getUserVideo(userId)).then((result) => {
      if (result.payload) {
        setVideos(result.payload.videos);
      }
    });
  }, [dispatch, userId]);

  const handleVideoClick = () => {
    videoInputRef.current.click();
  };

  const handleThumbnailClick = () => {
    thumbnailInputRef.current.click();
  };

  const handleChange = (e, type) => {
    if (e.target.files[0]) {
      if (type === "video") {
        setDetails((prevDetails) => ({
          ...prevDetails,
          video: e.target.files[0],
          videoUrl: URL.createObjectURL(e.target.files[0]),
        }));
      } else if (type === "thumbnail") {
        setDetails((prevDetails) => ({
          ...prevDetails,
          thumbnail: e.target.files[0],
          thumbnailUrl: URL.createObjectURL(e.target.files[0]),
        }));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(details.video)
    const formData = new FormData();
    formData.append("title", details.title);
    formData.append("description", details.description);
    formData.append("videoFile", details.video);
    formData.append("thumbnail", details.thumbnailUrl);

    dispatch(uploadVideo(formData)).then((result) => {
      if (result.payload) {
        setVideos(result.payload);
        setUploadProgress(0); // Reset progress after successful upload
      }
    });
  };

  return (
    <div className="border-t-2 border-gray-300 p-10">
      <h1 className="text-4xl font-bold mb-4">Your videos</h1>
      <div className="grid grid-cols-12 gap-2">
        {videos.map((video, idx) => (
          <VideoCard key={idx} item={video} />
        ))}
      </div>
      <div className="border-t-2 border-gray-300 py-10">
        <h1 className="text-4xl font-bold mb-10">Add Video</h1>
        <div className="h-40 aspect-video border-2 border-dashed border-gray-500 rounded-md flex justify-center items-center bg-gray-100 hover:bg-gray-200">
          <Popup
            contentStyle={{ width: "40%", borderRadius: "10px" }}
            trigger={
              <button className="px-4 py-2 flex items-center gap-3">
                <IconContext.Provider value={{ size: "25px" }}>
                  <FaPlus />
                </IconContext.Provider>
              </button>
            }
            modal
            nested
          >
            {(close) => (
              <div className="px-4 py-2">
                <div className="flex justify-between pb-4">
                  <h1 className="font-semibold text-2xl">Upload a video</h1>
                  <button onClick={() => close()}>
                    <RxCross1 />
                  </button>
                </div>
                {loading ? (
                  <div>Loading...</div>
                ) : (
                  <div className="p-4">
                    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                      <label htmlFor="title">Title</label>
                      <input
                        type="text"
                        id="title"
                        placeholder="Enter a title"
                        className="border-b-2 border-gray-200 text-lg focus:outline-none"
                        onChange={(e) =>
                          setDetails((prevDetails) => ({
                            ...prevDetails,
                            title: e.target.value,
                          }))
                        }
                        required
                      />
                      <label htmlFor="description">Description</label>
                      <input
                        type="text"
                        id="description"
                        placeholder="Enter a nice description"
                        className="border-b-2 border-gray-200 text-lg focus:outline-none"
                        onChange={(e) =>
                          setDetails((prevDetails) => ({
                            ...prevDetails,
                            description: e.target.value,
                          }))
                        }
                        required
                      />
                      <label htmlFor="video">Upload Video</label>
                      <input
                        type="file"
                        id="video"
                        ref={videoInputRef}
                        className="hidden"
                        onChange={(e) => handleChange(e, "video")}
                        accept="video/mp4"
                        required
                      />
                      <button
                        type="button"
                        onClick={handleVideoClick}
                        className="px-4 py-2 bg-blue-500 w-1/2 self-center text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                      >
                        Upload Video
                      </button>
                      {details.videoUrl && (
                        <video
                          src={details.videoUrl}
                          className="w-full h-20 mt-2"
                          controls
                        />
                      )}
                      <label htmlFor="thumbnail">Upload Thumbnail</label>
                      <input
                        type="file"
                        id="thumbnail"
                        ref={thumbnailInputRef}
                        accept="image/png, image/jpeg"
                        className="hidden"
                        onChange={(e) => handleChange(e, "thumbnail")}
                        required
                      />
                      <button
                        type="button"
                        onClick={handleThumbnailClick}
                        className="px-4 py-2 bg-blue-500 w-1/2 self-center text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                      >
                        Upload Thumbnail
                      </button>
                      {details.thumbnailUrl && (
                        <img
                          src={details.thumbnailUrl}
                          alt="Thumbnail Preview"
                          className="w-full h-20 mt-2"
                        />
                      )}
                      <button
                        type="submit"
                        className="mt-4 px-4 py-2 bg-blue-500 w-1/4 self-end text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                      >
                        Publish Video
                      </button>
                    </form>
                  </div>
                )}
              </div>
            )}
          </Popup>
        </div>
      </div>
    </div>
  );
};

export default YourVideos;
