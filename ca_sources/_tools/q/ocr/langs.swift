import Foundation
import Vision
let req = VNRecognizeTextRequest()
req.recognitionLevel = .accurate
if #available(macOS 13.0, *) { req.revision = VNRecognizeTextRequestRevision3 }
print((try? req.supportedRecognitionLanguages()) ?? [])
