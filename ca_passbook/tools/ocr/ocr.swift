// OCR one image with Apple's Vision framework and print JSON lines: [{"t":text,"c":confidence,"x":..,"y":..,"w":..,"h":..}]
// Coordinates are in pixels with a top-left origin. Build: swiftc -O -o ocr ocr.swift -framework Vision -framework AppKit
import Foundation
import Vision
import AppKit

guard CommandLine.arguments.count >= 2 else {
    FileHandle.standardError.write("usage: ocr <image>\n".data(using: .utf8)!)
    exit(2)
}
let path = CommandLine.arguments[1]
guard let img = NSImage(contentsOfFile: path),
      let cg = img.cgImage(forProposedRect: nil, context: nil, hints: nil) else {
    FileHandle.standardError.write("cannot read image\n".data(using: .utf8)!)
    exit(1)
}
let W = Double(cg.width), H = Double(cg.height)
let req = VNRecognizeTextRequest()
req.recognitionLevel = .accurate
req.usesLanguageCorrection = false
req.recognitionLanguages = ["en-US"]
req.minimumTextHeight = 0.004
let handler = VNImageRequestHandler(cgImage: cg, options: [:])
try handler.perform([req])
var rows: [[String: Any]] = []
for obs in (req.results ?? []) {
    guard let top = obs.topCandidates(1).first else { continue }
    let b = obs.boundingBox            // normalised, origin bottom-left
    rows.append(["t": top.string, "c": Double(top.confidence),
                 "x": b.minX * W, "y": (1 - b.maxY) * H, "w": b.width * W, "h": b.height * H])
}
rows.sort { ($0["y"] as! Double) < ($1["y"] as! Double) }
let data = try JSONSerialization.data(withJSONObject: rows, options: [])
FileHandle.standardOutput.write(data)
