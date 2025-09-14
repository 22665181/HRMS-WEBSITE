// Backend/controllers/eventController.js
import * as eventModel from "../models/eventModel.js"

export const createEvent = async (req, res, next) => {
  try {
    const {
      title,
      date,
      start_time,
      duration,
      timezone,
      mode_of_event,
      organizer,
      meeting_link,
      location,
      organizer_email,
    } = req.body

    console.log("📝 Received event creation request:", req.body)

    // Validate required fields
    if (!title || !date) {
      console.log("❌ Validation failed: Missing title or date")
      return res.status(400).json({
        success: false,
        message: "Title and date are required.",
      })
    }

    // Prepare event data
    const eventData = {
      title: title.trim(),
      date,
      start_time,
      duration: Number.parseInt(duration) || 60,
      timezone: timezone || "UTC",
      mode_of_event: (mode_of_event || "online").toLowerCase(),
      organizer: organizer?.trim() || "Unknown Organizer",
      meeting_link: meeting_link?.trim() || "",
      location: location?.trim() || "Virtual",
      organizer_email: organizer_email?.trim() || "organizer@example.com",
    }

    console.log("📝 Processed event data:", eventData)

    const newEvent = await eventModel.createEvent(eventData)

    console.log("✅ Event created successfully:", newEvent)

    res.status(201).json({
      success: true,
      message: "Event created successfully",
      data: newEvent,
    })
  } catch (err) {
    console.error("❌ Error creating event:", err)

    // Send more specific error message
    let errorMessage = "Failed to create event."
    if (err.code === "23502") {
      // NOT NULL violation
      errorMessage = "Missing required field. Please check all required fields are filled."
    } else if (err.code === "23505") {
      // Unique violation
      errorMessage = "An event with similar details already exists."
    } else if (err.message) {
      errorMessage = err.message
    }

    res.status(500).json({
      success: false,
      message: errorMessage,
      error: process.env.NODE_ENV === "development" ? err.message : undefined,
    })
  }
}

export const getEvents = async (req, res, next) => {
  try {
    console.log("📋 Fetching all events...")
    const events = await eventModel.getAllEvents()
    console.log(`✅ Found ${events.length} events`)

    res.status(200).json({
      success: true,
      message: "Events fetched successfully",
      data: events,
    })
  } catch (error) {
    console.error("❌ Error fetching events:", error)
    res.status(500).json({
      success: false,
      message: "Error fetching events",
      error: error.message,
    })
  }
}
