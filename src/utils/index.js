/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null;
  }
  const format = cFormat || "{y}-{m}-{d} {h}:{i}:{s}";
  let date;
  if (typeof time === "object") {
    date = time;
  } else {
    if (typeof time === "string") {
      if (/^[0-9]+$/.test(time)) {
        // support "1548221490638"
        time = parseInt(time);
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), "/");
      }
    }

    if (typeof time === "number" && time.toString().length === 10) {
      time = time * 1000;
    }
    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  };
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key];
    // Note: getDay() returns 0 on Sunday
    if (key === "a") {
      return ["日", "一", "二", "三", "四", "五", "六"][value];
    }
    return value.toString().padStart(2, "0");
  });
  return time_str;
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (("" + time).length === 10) {
    time = parseInt(time) * 1000;
  } else {
    time = +time;
  }
  const d = new Date(time);
  const now = Date.now();

  const diff = (now - d) / 1000;

  if (diff < 30) {
    return "刚刚";
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + "分钟前";
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + "小时前";
  } else if (diff < 3600 * 24 * 2) {
    return "1天前";
  }
  if (option) {
    return parseTime(time, option);
  } else {
    return (
      d.getMonth() +
      1 +
      "月" +
      d.getDate() +
      "日" +
      d.getHours() +
      "时" +
      d.getMinutes() +
      "分"
    );
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = decodeURIComponent(url.split("?")[1]).replace(/\+/g, " ");
  if (!search) {
    return {};
  }
  const obj = {};
  const searchArr = search.split("&");
  searchArr.forEach((v) => {
    const index = v.indexOf("=");
    if (index !== -1) {
      const name = v.substring(0, index);
      const val = v.substring(index + 1, v.length);
      obj[name] = val;
    }
  });
  return obj;
}
/**
 * @description: json转字符串
 * @param {*} js_on
 * @return {*}
 */
export function enjson(js_on) {
  return JSON.stringify(js_on);
}
/**
 * @description: 字符串转json
 * @param {*} js_on
 * @return {*}
 */
export function dejson(js_on) {
  return JSON.parse(js_on);
}
/**
 * @description: json深度拷贝
 * @param {*} js_on
 * @return {*}
 */
export function cpjson(js_on) {
  return JSON.parse(JSON.stringify(js_on));
}


/**
 * @description: 隐藏手机号
 * @param {*} phone
 * @return {*}
 */
export function hiddenPhone(phone) {
  return phone.replace(/([0-9]{3})([0-9]{4})([0-9]{4})/g, "$1****$3")
}

export const imageSize = (size) => {
  return `?imageMogr2/thumbnail/${size}x`
}



export const sizeFormat = (size) => {
  if (size == undefined) {
    return 0;
  }
  size = Number(size)
  if (size < 1000) {
    return (size * 1).toFixed(2) + 'KB';
  }
  if (size < 1000 * 1000) {
    return (size / 1000).toFixed(2) + 'MB'
  }
  if (size < 1000 * 1000 * 1000) {
    return (size / 1000 / 1000).toFixed(2) + 'GB'
  }
  if (size < 1000 * 1000 * 1000 * 1000) {
    return (size / 1000 / 1000 / 1000).toFixed(2) + 'TB'
  }
  if (size < 1000 * 1000 * 1000 * 1000 * 1000) {
    return (size / 1000 / 1000 / 1000 / 1000).toFixed(2) + 'PB'
  }
}

//防抖动
export const debounce = (func, wait) => {
  let timer
  return () => {
    clearTimeout(timer)
    timer = setTimeout(func, wait);
  }
}


export const copy = (text) => {
  navigator.clipboard.writeText(text).then(e => {
  }).catch(e => {
    let input = document.createElement("textarea");
    document.body.appendChild(input)
    input.value = text
    input.select()
    document.execCommand("COPY");
    input.remove();
  })
}
