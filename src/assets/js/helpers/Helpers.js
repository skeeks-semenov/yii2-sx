/*!
 *
 * Helpers containing various functions
 * Содержит как независимые вспомогательные, полезные функции.
 *
 * @date 06.11.2014
 * @copyright skeeks.com
 * @author Semenov Alexander <semenov@skeeks.com>
 */


(function(global, sx, $, _)
{
    sx.createNamespace('helpers', sx);
    /**
     * @type {{getParams: Function}}
     */
    sx.helpers.Request =
    {
        getParams: function()
        {
            var $_GET = {};
            var __GET = window.location.search.substring(1).split("&");

            for(var i=0; i<__GET.length; i++)
            {
              var getVar = __GET[i].split("=");
              $_GET[getVar[0]] = typeof(getVar[1]) == "undefined" ? "" : getVar[1];
            }

            return $_GET;
        }
    };
    /**
     * Для работы с url
     * @type {{redirect: Function}}
     */

    sx.helpers.Url = {

        redirect : function(url)
        {
            location.href = url;
        }
    };

    /**
     * Просто вспомогательные функции для работы со строками
     * @type {{strpos: Function, str_replace: Function}}
     */
    sx.helpers.String = {

        /**
         * Аналог php
         * @param haystack
         * @param needle
         * @param offset | с какого символа начинать поиск
         * @returns {*}
         */
        strpos: function(haystack, needle, offset)
        {
            var i = haystack.toString().indexOf( needle, offset ); // returns -1
            return i >= 0 ? i : false;
        },

        /**
         * Аналог php функции
         *
         * @param search
         * @param replace
         * @param subject
         * @returns {*}
         */
        str_replace: function( search, replace, subject )
        {
            if(!(replace instanceof Array)){
                replace=new Array(replace);
                if(search instanceof Array){//If search	is an array and replace	is a string, then this replacement string is used for every value of search
                    while(search.length>replace.length){
                        replace[replace.length]=replace[0];
                    }
                }
            }

            if(!(search instanceof Array))search=new Array(search);
            while(search.length>replace.length){//If replace	has fewer values than search , then an empty string is used for the rest of replacement values
                replace[replace.length]='';
            }

            if(subject instanceof Array){//If subject is an array, then the search and replace is performed with every entry of subject , and the return value is an array as well.
                for(k in subject){
                    subject[k]=str_replace(search,replace,subject[k]);
                }
                return subject;
            }

            for(var k=0; k<search.length; k++){
                var i = subject.indexOf(search[k]);
                while(i>-1){
                    subject = subject.replace(search[k], replace[k]);
                    i = subject.indexOf(search[k],i);
                }
            }

            return subject;
        },

        /**
         *
         * analog php function substr
         *
         * @param f_string
         * @param f_start
         * @param f_length
         * @return {String}
         */
        substr : function(f_string, f_start, f_length)
        {

            if(f_start < 0) {
                f_start += f_string.length;
            }

            if(f_length == undefined) {
                f_length = f_string.length;
            } else if(f_length < 0){
                f_length += f_string.length;
            } else {
                f_length += f_start;
            }

            if(f_length < f_start) {
                f_length = f_start;
            }

            return f_string.substring(f_start, f_length);
        },

        /**
         * Генерация случайной строки.
         *
         * @param length
         * @returns {string}
         */
        randStr: function(length)
        {
            length = length || 6;
            var result       = '';
            var words        = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
            var max_position = words.length - 1;

            for( i = 0; i < length; ++i )
            {
                position = Math.floor ( Math.random() * max_position );
                result = result + words.substring(position, position + 1);
            }

            return result;
        }
    };

    /**
     * Помощь для работы с массивами
     * @type {{in_array: Function, explode: Function, implode: Function}}
     */
    sx.helpers.Array = {

        /**
         * analog php function in_array
         *
         * @param value
         * @param array
         * @return {Boolean}
         */
        in_array : function(value, array)
        {
            for(var i = 0; i < array.length; i++)
            {
                if(array[i] == value) return true;
            }
            return false;
        },

        /**
         * Аналог php
         *
         * @param delimiter
         * @param string
         * @return {*}
         */
        explode: function(delimiter, string)
        {
            var emptyArray = { 0: '' };

            if ( arguments.length != 2
                || typeof arguments[0] == 'undefined'
                || typeof arguments[1] == 'undefined' )
            {
                return null;
            }

            if ( delimiter === ''
                || delimiter === false
                || delimiter === null )
            {
                return false;
            }

            if ( typeof delimiter == 'function'
                || typeof delimiter == 'object'
                || typeof string == 'function'
                || typeof string == 'object' )
            {
                return emptyArray;
            }

            if ( delimiter === true ) {
                delimiter = '1';
            }

            return string.toString().split ( delimiter.toString() );
        },

        /**
         * Аналог php
         * @param glue
         * @param pieces
         * @returns {*}
         */
        implode: function( glue, pieces ) {
            return ( ( pieces instanceof Array ) ? pieces.join ( glue ) : pieces );
        }

    };

})(window, Skeeks, Skeeks.$, Skeeks._);