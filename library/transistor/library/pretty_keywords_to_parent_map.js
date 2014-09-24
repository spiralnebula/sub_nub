"use strict";
(function ( window, module ) {

	if ( window.define && window.define.amd ) {
		define(module)
	} else { 

		var current_scripts, this_script, module_name

		current_scripts     = document.getElementsByTagName("script")
		this_script         = current_scripts[current_scripts.length-1]
		module_name         = this_script.getAttribute("data-module-name") || "keyword_to_parent_map"
		window[module_name] = module
	}
})(
	window,
	{
		define : { 
			allow : "*"
		},
		map : {
			"class" : {
				parent   : "attribute", 
				property : "class"
			},
			"id" : {
				parent   : "attribute", 
				property : "id"
			},
			"value" : {
				parent   : "attribute", 
				property : "value"
			},
			"val" : {
				parent   : "attribute", 
				property : "value"
			},
			"placeholder" : { 
				parent   : "attribute",
				property : "placeholder"
			},
			"target" : {
				parent   : "attribute", 
				property : "target"
			},
			"href" : {
				parent   : "attribute", 
				property : "href"
			},
			"src" : {
				parent   : "attribute", 
				property : "src"
			},
			"text"  : {
				parent   : "property",
				property : "textContent"
			},
			"align-content" : {
				parent   : "style",
				property : "alignContent"
			},
			"align-items" : {
				parent   : "style",
				property : "alignItems"
			},
			"align-self" : {
				parent   : "style",
				property : "alignSelf"
			},
			"alignment-baseline" : {
				parent   : "style",
				property : "alignmentBaseline"
			},
			"backface-visibility" : {
				parent   : "style",
				property : "backfaceVisibility"
			},
			"background" : {
				parent   : "style",
				property : "background"
			},
			"background-attachment" : {
				parent   : "style",
				property : "backgroundAttachment"
			},
			"background-blend-mode" : {
				parent   : "style",
				property : "backgroundBlendMode"
			},
			"background-clip" : {
				parent   : "style",
				property : "backgroundClip"
			},
			"background-color" : {
				parent   : "style",
				property : "backgroundColor"
			},
			"background-image" : {
				parent   : "style",
				property : "backgroundImage"
			},
			"background-origin" : {
				parent   : "style",
				property : "backgroundOrigin"
			},
			"background-position" : {
				parent   : "style",
				property : "backgroundPosition"
			},
			"background-position-x" : {
				parent   : "style",
				property : "backgroundPositionX"
			},
			"background-position-y" : {
				parent   : "style",
				property : "backgroundPositionY"
			},
			"background-repeat" : {
				parent   : "style",
				property : "backgroundRepeat"
			},
			"background-repeat-x" : {
				parent   : "style",
				property : "backgroundRepeatX"
			},
			"background-repeat-y" : {
				parent   : "style",
				property : "backgroundRepeatY"
			},
			"background-size" : {
				parent   : "style",
				property : "backgroundSize"
			},
			"baseline-shift" : {
				parent   : "style",
				property : "baselineShift"
			},
			"border" : {
				parent   : "style",
				property : "border"
			},
			"border-bottom" : {
				parent   : "style",
				property : "borderBottom"
			},
			"border-bottom-color" : {
				parent   : "style",
				property : "borderBottomColor"
			},
			"border-bottom-left-radius" : {
				parent   : "style",
				property : "borderBottomLeftRadius"
			},
			"border-bottom-right-radius" : {
				parent   : "style",
				property : "borderBottomRightRadius"
			},
			"border-bottom-style" : {
				parent   : "style",
				property : "borderBottomStyle"
			},
			"border-bottom-width" : {
				parent   : "style",
				property : "borderBottomWidth"
			},
			"border-collapse" : {
				parent   : "style",
				property : "borderCollapse"
			},
			"border-color" : {
				parent   : "style",
				property : "borderColor"
			},
			"border-image" : {
				parent   : "style",
				property : "borderImage"
			},
			"border-image-outset" : {
				parent   : "style",
				property : "borderImageOutset"
			},
			"border-image-repeat" : {
				parent   : "style",
				property : "borderImageRepeat"
			},
			"border-image-slice" : {
				parent   : "style",
				property : "borderImageSlice"
			},
			"border-image-source" : {
				parent   : "style",
				property : "borderImageSource"
			},
			"border-image-width" : {
				parent   : "style",
				property : "borderImageWidth"
			},
			"border-left" : {
				parent   : "style",
				property : "borderLeft"
			},
			"border-left-color" : {
				parent   : "style",
				property : "borderLeftColor"
			},
			"border-left-style" : {
				parent   : "style",
				property : "borderLeftStyle"
			},
			"border-left-width" : {
				parent   : "style",
				property : "borderLeftWidth"
			},
			"border-radius" : {
				parent   : "style",
				property : "borderRadius"
			},
			"border-right" : {
				parent   : "style",
				property : "borderRight"
			},
			"border-right-color" : {
				parent   : "style",
				property : "borderRightColor"
			},
			"border-right-style" : {
				parent   : "style",
				property : "borderRightStyle"
			},
			"border-right-width" : {
				parent   : "style",
				property : "borderRightWidth"
			},
			"border-spacing" : {
				parent   : "style",
				property : "borderSpacing"
			},
			"border-style" : {
				parent   : "style",
				property : "borderStyle"
			},
			"border-top" : {
				parent   : "style",
				property : "borderTop"
			},
			"border-top-color" : {
				parent   : "style",
				property : "borderTopColor"
			},
			"border-top-left-radius" : {
				parent   : "style",
				property : "borderTopLeftRadius"
			},
			"border-top-right-radius" : {
				parent   : "style",
				property : "borderTopRightRadius"
			},
			"border-top-style" : {
				parent   : "style",
				property : "borderTopStyle"
			},
			"border-top-width" : {
				parent   : "style",
				property : "borderTopWidth"
			},
			"border-width" : {
				parent   : "style",
				property : "borderWidth"
			},
			"bottom" : {
				parent   : "style",
				property : "bottom"
			},
			"box-shadow" : {
				parent   : "style",
				property : "boxShadow"
			},
			"box-sizing" : {
				parent   : "style",
				property : "boxSizing"
			},
			"buffered-rendering" : {
				parent   : "style",
				property : "bufferedRendering"
			},
			"caption-side" : {
				parent   : "style",
				property : "captionSide"
			},
			"clear" : {
				parent   : "style",
				property : "clear"
			},
			"clip" : {
				parent   : "style",
				property : "clip"
			},
			"clip-path" : {
				parent   : "style",
				property : "clipPath"
			},
			"clip-rule" : {
				parent   : "style",
				property : "clipRule"
			},
			"color" : {
				parent   : "style",
				property : "color"
			},
			"color-interpolation" : {
				parent   : "style",
				property : "colorInterpolation"
			},
			"color-interpolation-filters" : {
				parent   : "style",
				property : "colorInterpolationFilters"
			},
			"color-rendering" : {
				parent   : "style",
				property : "colorRendering"
			},
			"content" : {
				parent   : "style",
				property : "content"
			},
			"counter-increment" : {
				parent   : "style",
				property : "counterIncrement"
			},
			"counter-reset" : {
				parent   : "style",
				property : "counterReset"
			},
			"css-text" : {
				parent   : "style",
				property : "cssText"
			},
			"cursor" : {
				parent   : "style",
				property : "cursor"
			},
			"direction" : {
				parent   : "style",
				property : "direction"
			},
			"display" : {
				parent   : "style",
				property : "display"
			},
			"dominant-baseline" : {
				parent   : "style",
				property : "dominantBaseline"
			},
			"empty-cells" : {
				parent   : "style",
				property : "emptyCells"
			},
			"enable-background" : {
				parent   : "style",
				property : "enableBackground"
			},
			"fill" : {
				parent   : "style",
				property : "fill"
			},
			"fill-opacity" : {
				parent   : "style",
				property : "fillOpacity"
			},
			"fill-rule" : {
				parent   : "style",
				property : "fillRule"
			},
			"filter" : {
				parent   : "style",
				property : "filter"
			},
			"flex" : {
				parent   : "style",
				property : "flex"
			},
			"flex-basis" : {
				parent   : "style",
				property : "flexBasis"
			},
			"flex-direction" : {
				parent   : "style",
				property : "flexDirection"
			},
			"flex-flow" : {
				parent   : "style",
				property : "flexFlow"
			},
			"flex-grow" : {
				parent   : "style",
				property : "flexGrow"
			},
			"flex-shrink" : {
				parent   : "style",
				property : "flexShrink"
			},
			"flex-wrap" : {
				parent   : "style",
				property : "flexWrap"
			},
			"float" : {
				parent   : "style",
				property : "float"
			},
			"flood-color" : {
				parent   : "style",
				property : "floodColor"
			},
			"flood-opacity" : {
				parent   : "style",
				property : "floodOpacity"
			},
			"font" : {
				parent   : "style",
				property : "font"
			},
			"font-family" : {
				parent   : "style",
				property : "fontFamily"
			},
			"font-kerning" : {
				parent   : "style",
				property : "fontKerning"
			},
			"font-size" : {
				parent   : "style",
				property : "fontSize"
			},
			"font-stretch" : {
				parent   : "style",
				property : "fontStretch"
			},
			"font-style" : {
				parent   : "style",
				property : "fontStyle"
			},
			"font-variant" : {
				parent   : "style",
				property : "fontVariant"
			},
			"font-variant-ligatures" : {
				parent   : "style",
				property : "fontVariantLigatures"
			},
			"font-weight" : {
				parent   : "style",
				property : "fontWeight"
			},
			"glyph-orientation-horizontal" : {
				parent   : "style",
				property : "glyphOrientationHorizontal"
			},
			"glyph-orientation-vertical" : {
				parent   : "style",
				property : "glyphOrientationVertical"
			},
			"height" : {
				parent   : "style",
				property : "height"
			},
			"image-rendering" : {
				parent   : "style",
				property : "imageRendering"
			},
			"justify-content" : {
				parent   : "style",
				property : "justifyContent"
			},
			"left" : {
				parent   : "style",
				property : "left"
			},
			"letter-spacing" : {
				parent   : "style",
				property : "letterSpacing"
			},
			"lighting-color" : {
				parent   : "style",
				property : "lightingColor"
			},
			"line-height" : {
				parent   : "style",
				property : "lineHeight"
			},
			"list-style" : {
				parent   : "style",
				property : "listStyle"
			},
			"list-style-image" : {
				parent   : "style",
				property : "listStyleImage"
			},
			"list-style-position" : {
				parent   : "style",
				property : "listStylePosition"
			},
			"list-style-type" : {
				parent   : "style",
				property : "listStyleType"
			},
			"margin" : {
				parent   : "style",
				property : "margin"
			},
			"margin-bottom" : {
				parent   : "style",
				property : "marginBottom"
			},
			"margin-left" : {
				parent   : "style",
				property : "marginLeft"
			},
			"margin-right" : {
				parent   : "style",
				property : "marginRight"
			},
			"margin-top" : {
				parent   : "style",
				property : "marginTop"
			},
			"marker" : {
				parent   : "style",
				property : "marker"
			},
			"marker-end" : {
				parent   : "style",
				property : "markerEnd"
			},
			"marker-mid" : {
				parent   : "style",
				property : "markerMid"
			},
			"marker-start" : {
				parent   : "style",
				property : "markerStart"
			},
			"mask" : {
				parent   : "style",
				property : "mask"
			},
			"mask-type" : {
				parent   : "style",
				property : "maskType"
			},
			"max-height" : {
				parent   : "style",
				property : "maxHeight"
			},
			"max-width" : {
				parent   : "style",
				property : "maxWidth"
			},
			"max-zoom" : {
				parent   : "style",
				property : "maxZoom"
			},
			"min-height" : {
				parent   : "style",
				property : "minHeight"
			},
			"min-width" : {
				parent   : "style",
				property : "minWidth"
			},
			"min-zoom" : {
				parent   : "style",
				property : "minZoom"
			},
			"object-fit" : {
				parent   : "style",
				property : "objectFit"
			},
			"object-position" : {
				parent   : "style",
				property : "objectPosition"
			},
			"opacity" : {
				parent   : "style",
				property : "opacity"
			},
			"order" : {
				parent   : "style",
				property : "order"
			},
			"orientation" : {
				parent   : "style",
				property : "orientation"
			},
			"orphans" : {
				parent   : "style",
				property : "orphans"
			},
			"outline" : {
				parent   : "style",
				property : "outline"
			},
			"outline-color" : {
				parent   : "style",
				property : "outlineColor"
			},
			"outline-offset" : {
				parent   : "style",
				property : "outlineOffset"
			},
			"outline-style" : {
				parent   : "style",
				property : "outlineStyle"
			},
			"outline-width" : {
				parent   : "style",
				property : "outlineWidth"
			},
			"overflow" : {
				parent   : "style",
				property : "overflow"
			},
			"overflow-wrap" : {
				parent   : "style",
				property : "overflowWrap"
			},
			"overflow-x" : {
				parent   : "style",
				property : "overflowX"
			},
			"overflow-y" : {
				parent   : "style",
				property : "overflowY"
			},
			"padding" : {
				parent   : "style",
				property : "padding"
			},
			"padding-bottom" : {
				parent   : "style",
				property : "paddingBottom"
			},
			"padding-left" : {
				parent   : "style",
				property : "paddingLeft"
			},
			"padding-right" : {
				parent   : "style",
				property : "paddingRight"
			},
			"padding-top" : {
				parent   : "style",
				property : "paddingTop"
			},
			"page" : {
				parent   : "style",
				property : "page"
			},
			"page-break-after" : {
				parent   : "style",
				property : "pageBreakAfter"
			},
			"page-break-before" : {
				parent   : "style",
				property : "pageBreakBefore"
			},
			"page-break-inside" : {
				parent   : "style",
				property : "pageBreakInside"
			},
			"paint-order" : {
				parent   : "style",
				property : "paintOrder"
			},
			"parent-rule: " : {
				parent   : "style",
				property : "parentRule: "
			},
			"perspective" : {
				parent   : "style",
				property : "perspective"
			},
			"perspective-origin" : {
				parent   : "style",
				property : "perspectiveOrigin"
			},
			"pointer-events" : {
				parent   : "style",
				property : "pointerEvents"
			},
			"position" : {
				parent   : "style",
				property : "position"
			},
			"quotes" : {
				parent   : "style",
				property : "quotes"
			},
			"resize" : {
				parent   : "style",
				property : "resize"
			},
			"right" : {
				parent   : "style",
				property : "right"
			},
			"shape-rendering" : {
				parent   : "style",
				property : "shapeRendering"
			},
			"size" : {
				parent   : "style",
				property : "size"
			},
			"speak" : {
				parent   : "style",
				property : "speak"
			},
			"s-src" : {
				parent   : "style",
				property : "src"
			},
			"stop-color" : {
				parent   : "style",
				property : "stopColor"
			},
			"stop-opacity" : {
				parent   : "style",
				property : "stopOpacity"
			},
			"stroke" : {
				parent   : "style",
				property : "stroke"
			},
			"stroke-dasharray" : {
				parent   : "style",
				property : "strokeDasharray"
			},
			"stroke-dashoffset" : {
				parent   : "style",
				property : "strokeDashoffset"
			},
			"stroke-linecap" : {
				parent   : "style",
				property : "strokeLinecap"
			},
			"stroke-linejoin" : {
				parent   : "style",
				property : "strokeLinejoin"
			},
			"stroke-miterlimit" : {
				parent   : "style",
				property : "strokeMiterlimit"
			},
			"stroke-opacity" : {
				parent   : "style",
				property : "strokeOpacity"
			},
			"stroke-width" : {
				parent   : "style",
				property : "strokeWidth"
			},
			"tab-size" : {
				parent   : "style",
				property : "tabSize"
			},
			"table-layout" : {
				parent   : "style",
				property : "tableLayout"
			},
			"text-align" : {
				parent   : "style",
				property : "textAlign"
			},
			"text-anchor" : {
				parent   : "style",
				property : "textAnchor"
			},
			"text-decoration" : {
				parent   : "style",
				property : "textDecoration"
			},
			"text-indent" : {
				parent   : "style",
				property : "textIndent"
			},
			"text-line-through-color" : {
				parent   : "style",
				property : "textLineThroughColor"
			},
			"text-line-through-mode" : {
				parent   : "style",
				property : "textLineThroughMode"
			},
			"text-line-through-style" : {
				parent   : "style",
				property : "textLineThroughStyle"
			},
			"text-line-through-width" : {
				parent   : "style",
				property : "textLineThroughWidth"
			},
			"text-overflow" : {
				parent   : "style",
				property : "textOverflow"
			},
			"text-overline-color" : {
				parent   : "style",
				property : "textOverlineColor"
			},
			"text-overline-mode" : {
				parent   : "style",
				property : "textOverlineMode"
			},
			"text-overline-style" : {
				parent   : "style",
				property : "textOverlineStyle"
			},
			"text-overline-width" : {
				parent   : "style",
				property : "textOverlineWidth"
			},
			"text-rendering" : {
				parent   : "style",
				property : "textRendering"
			},
			"text-shadow" : {
				parent   : "style",
				property : "textShadow"
			},
			"text-transform" : {
				parent   : "style",
				property : "textTransform"
			},
			"text-underline-color" : {
				parent   : "style",
				property : "textUnderlineColor"
			},
			"text-underline-mode" : {
				parent   : "style",
				property : "textUnderlineMode"
			},
			"text-underline-style" : {
				parent   : "style",
				property : "textUnderlineStyle"
			},
			"text-underline-width" : {
				parent   : "style",
				property : "textUnderlineWidth"
			},
			"top" : {
				parent   : "style",
				property : "top"
			},
			"touch-action" : {
				parent   : "style",
				property : "touchAction"
			},
			"transform" : {
				parent   : "style",
				property : "transform"
			},
			"transform-origin" : {
				parent   : "style",
				property : "transformOrigin"
			},
			"transform-style" : {
				parent   : "style",
				property : "transformStyle"
			},
			"transition" : {
				parent   : "style",
				property : "transition"
			},
			"transition-delay" : {
				parent   : "style",
				property : "transitionDelay"
			},
			"transition-duration" : {
				parent   : "style",
				property : "transitionDuration"
			},
			"transition-property" : {
				parent   : "style",
				property : "transitionProperty"
			},
			"transition-timing-function" : {
				parent   : "style",
				property : "transitionTimingFunction"
			},
			"unicode-bidi" : {
				parent   : "style",
				property : "unicodeBidi"
			},
			"unicode-range" : {
				parent   : "style",
				property : "unicodeRange"
			},
			"user-zoom" : {
				parent   : "style",
				property : "userZoom"
			},
			"vector-effect" : {
				parent   : "style",
				property : "vectorEffect"
			},
			"vertical-align" : {
				parent   : "style",
				property : "verticalAlign"
			},
			"visibility" : {
				parent   : "style",
				property : "visibility"
			},
			"white-space" : {
				parent   : "style",
				property : "whiteSpace"
			},
			"widows" : {
				parent   : "style",
				property : "widows"
			},
			"width" : {
				parent   : "style",
				property : "width"
			},
			"will-change" : {
				parent   : "style",
				property : "willChange"
			},
			"word-break" : {
				parent   : "style",
				property : "wordBreak"
			},
			"word-spacing" : {
				parent   : "style",
				property : "wordSpacing"
			},
			"word-wrap" : {
				parent   : "style",
				property : "wordWrap"
			},
			"writing-mode" : {
				parent   : "style",
				property : "writingMode"
			},
			"z-index" : {
				parent   : "style",
				property : "zIndex"
			},
			"zoom" : {
				parent   : "style",
				property : "zoom"
			},
		}
	}
)